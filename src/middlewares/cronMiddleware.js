const Blog = require('../model/Blog');
const send = require("../utils/sendEmail");
const User = require("../model/User");
const cron = require("node-cron");

// Sending mail process
const sendEmailOnChange = () => {
    Blog.watch().on('change', async (change) => {
        if (change.operationType === 'insert') {
            const users = await User.find({isSubscriber: true});
            const newBlog = change.fullDocument;
            const emailPromises = users.map(async (user) => {
                const emailOptions = {
                    email: user.email,
                    subject: 'Walknjoy News',
                    message: `A new blog has been published: ${newBlog.title}`,
                };
                await send.sendMail(emailOptions);
            });

            await Promise.all(emailPromises);
        }
    });
};

const sendEmailOnDiscount = (product) => {
        product.watch().on('change', async (change) => {
            if (change.operationType === "insert") {
                const users = await User.find({isSubscriber: true});
                const newProduct = change.fullDocument;
                if (newProduct.percent !== 0) {
                    const emailPromises = users.map(async (user) => {
                        const emailOptions = {
                            email: user.email,
                            subject: 'Walknjoy Discounts',
                            message: `There is a discount on Walknjoy You can want to see that:  ${newProduct.title.toUpperCase()}`,
                        };
                        await send.sendMail(emailOptions);
                    });
                    await Promise.all(emailPromises);
                }
            }
        })
}

// Schedule the cron job separately outside the change event handler
const cronNews = (req, res, next) => {
    cron.schedule('*/2 * * * * *', () => {
        sendEmailOnChange();
    });
    next();
}

const cronDiscount = (product)=> {
    return (req, res, next) => {
        cron.schedule('*/2 * * * * *', () => {
            sendEmailOnDiscount(product)
        })
        next()
    }
}

module.exports = {cronNews, cronDiscount}
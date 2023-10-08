const Blog = require('../model/Blog');
const send = require("../utils/sendEmail");
const User = require("../model/User");
const cron = require("node-cron");

// Sending mail process
const sendEmailOnChange = () => {
  Blog.watch().on('change', async (change) => {
    if (change.operationType === 'insert') {
      console.log("Değişiklik algılandı");
      const users = await User.find({ isSubscriber: true });
      const newBlog = change.fullDocument;
      users.forEach(user => {
        const options = {
          email: user.email,
          subject: 'Walknjoy News',
          message: `A new blog has been published: ${newBlog.title}`,
        };
        send.sendMail(options);
      });
    }
  });
};

// Schedule the cron job separately outside the change event handler
exports.cronRun = (req, res, next)=>{
    cron.schedule('*/2 * * * * *', () => {
    sendEmailOnChange();
  });
    next();
}

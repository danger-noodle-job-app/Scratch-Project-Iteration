const { Job } = require('../models/jobModel');
const { DBDarkmode } = require('../models/darkModel');
const { getUser } = require('../googleAuth')

const jobController = {
  //create job app.
  async createJob(req, res, next) {
    try {
      const googleId = res.locals.googleId;
      const { dateApplied, company, title, salary, status, link, comments } =
        req.body;
      if (
        dateApplied.length &&
        company.length &&
        title.length &&
        status.length
      ) {
        const newJob = await Job.create({
          dateApplied,
          company,
          title,
          salary,
          status,
          link,
          comments,
          googleId,
        });
        return next();
      } else {
        return next({
          log: 'Error in the jobController.createJob',
          message: { err: 'Error in creating new job application' },
          status: 400,
        });
      }
    } catch (error) {
      return next({
        log: `Error in the jobController.createJob: ${error}`,
        message: { err: 'Error in creating new job application' },
        status: 500,
      });
    }
  },

  async updateStatus(req, res, next) {
    //update the status of the job.
    try {
      const jobId = req.params.id;
      const { status } = req.body;

      if (status.length) {
        const updatedJob = await Job.updateOne({ _id: jobId }, { status });
        return next();
      } else {
        return next({
          log: 'Error in the jobController.updateStatus',
          message: { err: 'Error occured in updating status' },
          status: 400,
        });
      }
    } catch (error) {
      return next({
        log: `Error in the jobController.updateStatus: ${error}`,
        message: { err: 'Error occured in updating status' },
        status: 500,
      });
    }
  },

  async deleteStatus(req, res, next) {
    try {
      const jobId = req.params.id;
      if (jobId) {
        const deletedJob = await Job.findByIdAndDelete(jobId);
        return next();
      } else {
        return next({
          log: 'Error in the jobController.deleteStatus',
          message: { err: 'Error occured in deleting job' },
          status: 400,
        });
      }
    } catch (error) {
      return next({
        log: `Error in the jobController.deleteStatus: ${error}`,
        message: { err: 'Error occured in deleting job' },
        status: 500,
      });
    }
  },

  async syncData(req, res, next) {
    const googleId = res.locals.googleId;
    console.log('this is googleID in syncdata', googleId)
    let allInterested, allApplied, allInterviewed, FollowedUp, allRejected, allAccepted;
    try {
      if(!googleId){
         allInterested = await Job.find({ status: 'Interested' });
         allApplied = await Job.find({ status: 'Applied' });
         allInterviewed = await Job.find({ status: 'Interviewed' });
         FollowedUp = await Job.find({ status: 'FollowedUp' });
         allRejected = await Job.find({ status: 'Rejected' });
         allAccepted = await Job.find({ status: 'Accepted' });
      } else {
         allInterested= await Job.find({ status: 'Interested', googleId: googleId});
         allApplied = await Job.find({ status: 'Applied', googleId: googleId });
         allInterviewed = await Job.find({ status: 'Interviewed', googleId: googleId });
         FollowedUp = await Job.find({ status: 'FollowedUp', googleId: googleId });
         allRejected = await Job.find({ status: 'Rejected', googleId: googleId });
         allAccepted = await Job.find({ status: 'Accepted', googleId: googleId });

        console.log('this is fetched allfollowedup', FollowedUp)
      }

      let syncObject = {
        Interested: allInterested,
        Applied: allApplied,
        Interviewed: allInterviewed,
        FollowedUp: FollowedUp,
        Accepted: allAccepted,
        Rejected: allRejected,
      };

      res.locals.syncData = syncObject;
      return next();
    } catch (error) {
      return next({
        log: `Error in the jobController.syncData: ${error}`,
        message: { err: 'Error occured in syncing' },
        status: 500,
      });
    }
  },

  async editPost(req, res, next) {
    // Editing the post.
    try {
      const jobId = req.params.id;
      const { dateApplied, company, title, salary, status, link, comments } =
        req.body;

      if (status.length) {
        const updatedJob = await Job.updateOne(
          { _id: jobId },
          { dateApplied, company, title, salary, status, link, comments }
        );
        return next();
      } else {
        return next({
          log: 'Error in the jobController.editPost',
          message: { err: 'Error occured in editing the post' },
          status: 400,
        });
      }
    } catch (error) {
      return next({
        log: `Error in the jobController.editPost: ${error}`,
        message: { err: 'Error occured in editing post' },
        status: 500,
      });
    }
  },

  getGoogleId (req, res, next) {
    // if(getUser()) res.locals.googleId = getUser();
    // console.log('googleId:', res.locals.googleId)
    // console.log(getUser());

    // CALLING getUser() gives us the ERROR
    res.locals.googleId = 1;
    return next();
  },

  async darkModeCheck(req, res, next) {
    try {
      const darkModeBool = await DBDarkmode.find();
      console.log('serverside darkmodebool', darkModeBool);
      res.locals.darkMode = darkModeBool;
      return next();
    } catch (error) {
      return next({
        log: `Error in the jobController.darkModeCheck: ${error}`,
        message: { err: 'Error occured checking DarkMode DB' },
        status: 500,
      });
    }
  },
};

module.exports = jobController;

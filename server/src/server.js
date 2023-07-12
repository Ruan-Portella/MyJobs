const app = require('./app');

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`MyJobs API listening on port ${port}!`);
});

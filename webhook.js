/* eslint-disable */
var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');


exports.rule = entities.Issue.onChange({
    title: "On-change 1",
    guard: function (ctx) {
        const logger = new Logger(ctx.traceEnabled);


        // --- #1 Issue.becomesReported ---
        logger.log("Running scripts for the \"New issue is created\" block");
        const issue_0 = ctx.issue;

        const IssuebecomesReportedFn_0 = () => {
            if (issue_0 === null || issue_0 === undefined) throw new Error('Block #1 (New issue is created): "Issue" has no value');

            return issue_0.becomesReported
        };


        try {
            return (
                IssuebecomesReportedFn_0()
            );
        } catch (err) {
            if (err?.message?.includes('has no value')) {
                logger.error('Failed to execute guard', err);
                return false;
            }
            throw err;
        }

    },
    action: function (ctx) {
        const logger = new Logger(ctx.traceEnabled);


        // --- #1 Issue.addComment ---
        logger.log("Running scripts for the \"Add a comment\" block");
        const issue_1 = ctx.issue;
        const string_0 = `haha`;
        const user_0 = ctx.currentUser;
        let addCommentIssueCommentResult_0;

        const IssueaddCommentFn_0 = () => {
            if (issue_1 === null || issue_1 === undefined) throw new Error('Block #1 (Add a comment): "Issue" has no value');
            if (string_0 === null || string_0 === undefined) throw new Error('Block #1 (Add a comment): "Comment text" has no value');
            if (user_0 === null || user_0 === undefined) throw new Error('Block #1 (Add a comment): "Author" has no value');

            addCommentIssueCommentResult_0 = issue_1.addComment(string_0, user_0);
        };

        IssueaddCommentFn_0();

        // --- #2 Send GET request ---
        logger.log("Running scripts for the \"Send GET request\" block");
        const url = 'http://37.220.81.38/youtrack';

        const sendGetRequestFn_0 = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.text();
                logger.log('GET request successful', data);
            } catch (error) {
                logger.error('Failed to send GET request', error);
            }
        };

        sendGetRequestFn_0();

    }
});

function Logger(useDebug = true) {
    return {
        log: (...args) => useDebug && console.log(...args),
        warn: (...args) => useDebug && console.warn(...args),
        error: (...args) => useDebug && console.error(...args)
    }
}
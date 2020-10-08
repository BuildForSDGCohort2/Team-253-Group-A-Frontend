import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
}));

export default function Privacy() {
  const classes = useStyles();

  return (
    <Paper className={classes.root} component="div" variant="outlined">
      <Typography gutterBottom variant="h4">
        Privacy Policy
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        At CleanOut, accessible from awesome-jang-7f1fc2.netlify.app, one of our
        main priorities is the privacy of our visitors. This Privacy Policy
        document contains types of information that are collected and recorded
        by CleanOut and how we use it.
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        If you have additional questions or require more information about our
        Privacy Policy, do not hesitate to contact us.
      </Typography>

      <Typography gutterBottom variant="h6">
        General Data Protection Regulation (GDPR
      </Typography>
      <Typography gutterBottom variant="body1" component="p" paragraph>
        We are a Data Controller of your information.
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        CleanOut legal basis for collecting and using the personal information
        described in this Privacy Policy depends on the Personal Information we
        collect and the specific context in which we collect the information:
      </Typography>
      <Typography gutterBottom variant="body1" component="ul">
        <li>CleanOut needs to perform a contract with you</li>
        <li>You have given CleanOut permission to do so</li>
        <li>
          Processing your personal information is in CleanOut legitimate
          interests
        </li>
        <li>CleanOut needs to comply with the law</li>
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        CleanOut will retain your personal information only for as long as is
        necessary for the purposes set out in this Privacy Policy. We will
        retain and use your information to the extent necessary to comply with
        our legal obligations, resolve disputes, and enforce our policies.
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        If you are a resident of the European Economic Area (EEA), you have
        certain data protection rights. If you wish to be informed what Personal
        Information we hold about you and if you want it to be removed from our
        systems, please contact us.
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        In certain circumstances, you have the following data protection rights:
      </Typography>
      <Typography gutterBottom variant="body1" component="ul">
        <li>
          The right to access, update or to delete the information we have on
          you.
        </li>
        <li>The right of rectification.</li>
        <li>The right to object.</li>
        <li>The right of restriction.</li>
        <li>The right to data portability</li>
        <li>The right to withdraw consent</li>
      </Typography>

      <Typography gutterBottom variant="h6">
        Log Files
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        CleanOut follows a standard procedure of using log files. These files
        log visitors when they visit websites. All hosting companies do this and
        a part of hosting services&apos; analytics. The information collected by
        log files includes internet protocol (IP) addresses, browser type,
        Internet Service Provider (ISP), date and time stamp, referring/exit
        pages, and possibly the number of clicks. These are not linked to any
        information that is personally identifiable. The purpose of the
        information is for analyzing trends, administering the site, tracking
        users&apos; movement on the website, and gathering demographic
        information.
      </Typography>

      <Typography gutterBottom variant="h6">
        Cookies and Web Beacons
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        Like any other website, CleanOut uses &apos;cookies&apos;. These cookies
        are used to store information including visitors&apos; preferences, and
        the pages on the website that the visitor accessed or visited. The
        information is used to optimize the users&apos; experience by
        customizing our web page content based on visitors&apos; browser type
        and/or other information.
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        For more general information on cookies, please read{" "}
        <Link
          color="secondary"
          href="https://www.cookieconsent.com/what-are-cookies/"
        >
          &quot;What Are Cookies&quot;
        </Link>
        .
      </Typography>

      <Typography gutterBottom variant="h6">
        Privacy Policies
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        You may consult this list to find the Privacy Policy for each of the
        advertising partners of CleanOut.
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        Third-party ad servers or ad networks uses technologies like cookies,
        JavaScript, or Web Beacons that are used in their respective
        advertisements and links that appear on CleanOut, which are sent
        directly to the user’s browser. They automatically receive your IP
        address when this occurs. These technologies are used to measure the
        effectiveness of their advertising campaigns and/or to personalize the
        advertising content that you see on websites that you visit.
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        Note that CleanOut has no access to or control over these cookies that
        are used by third-party advertisers.
      </Typography>

      <Typography gutterBottom variant="h6">
        Third Party Privacy Policies
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        CleanOut&apos;s Privacy Policy does not apply to other advertisers or
        websites. Thus, we are advising you to consult the respective Privacy
        Policies of these third-party ad servers for more detailed information.
        It may include their practices and instructions about how to opt-out of
        certain options.
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        You can choose to disable cookies through your individual browser
        options. To know more detailed information about cookie management with
        specific web browsers, it can be found at the browsers&apos; respective
        websites.
      </Typography>

      <Typography gutterBottom variant="h6">
        Children&apos;s Information
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        Another part of our priority is adding protection for children while
        using the internet. We encourage parents and guardians to observe,
        participate in, and/or monitor and guide their online activity.
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        CleanOut does not knowingly collect any Personal Identifiable
        Information from children under the age of 13. If you think that your
        child provided this kind of information on our website, we strongly
        encourage you to contact us immediately and we will do our best efforts
        to promptly remove such information from our records.
      </Typography>

      <Typography gutterBottom variant="h6">
        Online Privacy Policy Only
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        Our Privacy Policy created at GDPRPrivacyPolicy.net) applies only to our
        online activities and is valid for visitors to our website with regards
        to the information that they shared and/or collect in CleanOut. This
        policy is not applicable to any information collected offline or via
        channels other than this website.
      </Typography>

      <Typography gutterBottom variant="h6">
        Consent
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        By using our website, you hereby consent to our Privacy Policy and agree
        to its terms.
      </Typography>
    </Paper>
  );
}

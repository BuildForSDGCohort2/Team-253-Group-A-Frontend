import React from "react";
import { Link as LinkRouter } from "react-router-dom";
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

export default function Terms() {
  const classes = useStyles();

  return (
    <Paper className={classes.root} variant="outlined">
      <Typography gutterBottom variant="h4">
        Terms of service
      </Typography>
      <Typography gutterBottom variant="h6">
        1. Terms
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        By accessing this Website, accessible from
        awesome-jang-7f1fc2.netlify.app, you are agreeing to be bound by these
        Website Terms and Conditions of Use and agree that you are responsible
        for the agreement with any applicable local laws. If you disagree with
        any of these terms, you are prohibited from accessing this site. The
        materials contained in this Website are protected by copyright and
        trademark law.
      </Typography>

      <Typography gutterBottom variant="h6">
        2. Use License
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        Permission is granted to temporarily download one copy of the materials
        on CleanOut&apos;s Website for personal, non-commercial transitory
        viewing only. This is the grant of a license, not a transfer of title,
        and under this license, you may not:
      </Typography>

      <Typography gutterBottom variant="body1" component="ul">
        <li>modify or copy the materials;</li>
        <li>
          use the materials for any commercial purpose or for any public
          display;
        </li>
        <li>
          attempt to reverse engineer any software contained on CleanOut&apos;s
          Website;
        </li>
        <li>
          remove any copyright or other proprietary notations from the
          materials; or
        </li>
        <li>
          transferring the materials to another person or &quot;mirror&quot; the
          materials on any other server.
        </li>
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        This will let CleanOut to terminate upon violations of any of these
        restrictions. Upon termination, your viewing right will also be
        terminated and you should destroy any downloaded materials in your
        possession whether it is printed or electronic format.
      </Typography>

      <Typography gutterBottom variant="h6">
        3. Disclaimer
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        All the materials on CleanOut’s Website are provided &quot;as is&quot;.
        CleanOut makes no warranties, may it be expressed or implied, therefore
        negates all other warranties. Furthermore, CleanOut does not make any
        representations concerning the accuracy or reliability of the use of the
        materials on its Website or otherwise relating to such materials or any
        sites linked to this Website.
      </Typography>

      <Typography gutterBottom variant="h6">
        4. Limitations
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        CleanOut or its suppliers will not be held accountable for any damages
        that will arise with the use or inability to use the materials on
        CleanOut’s Website, even if CleanOut or an authorized representative of
        this Website has been notified, orally or written, of the possibility of
        such damage. Some jurisdiction does not allow limitations on implied
        warranties or limitations of liability for incidental damages, these
        limitations may not apply to you.
      </Typography>

      <Typography gutterBottom variant="h6">
        5. Revisions and Errata
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        The materials appearing on CleanOut’s Website may include technical,
        typographical, or photographic errors. CleanOut will not promise that
        any of the materials in this Website are accurate, complete, or current.
        CleanOut may change the materials contained on its Website at any time
        without notice. CleanOut does not make any commitment to update the
        materials.
      </Typography>

      <Typography gutterBottom variant="h6">
        6. Links
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        CleanOut has not reviewed all of the sites linked to its Website and is
        not responsible for the contents of any such linked site. The presence
        of any link does not imply endorsement by CleanOut of the site. The use
        of any linked website is at the user’s own risk.
      </Typography>

      <Typography gutterBottom variant="h6">
        7. Site Terms of Use Modifications
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        CleanOut may revise these Terms of Use for its Website at any time
        without prior notice. By using this Website, you are agreeing to be
        bound by the current version of these Terms and Conditions of Use.
      </Typography>

      <Typography gutterBottom variant="h6">
        8. Your Privacy
      </Typography>

      <Typography gutterBottom variant="body1" component="p">
        Please read our{" "}
        <Link color="secondary" component={LinkRouter} to="/privacy-policy">
          Privacy Policy
        </Link>
        .
      </Typography>

      <Typography gutterBottom variant="h6">
        9. Governing Law
      </Typography>

      <Typography gutterBottom variant="body1" component="p" paragraph>
        Any claim related to CleanOut&apos;s Website shall be governed by the
        laws of Morocco without regards to its conflict of law provisions.
      </Typography>
    </Paper>
  );
}

import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";

// header image
import ERUPT2017Image from "../../../assets/ERUPT_2017.jpg";

// material-ui
import Typography from "@material-ui/core/Typography";

// markdown text
import welcomeTextFile from "./welcome.md";

// styles
import { makeStyles } from "@material-ui/styles";
import styles from "./styles";

const Image = ({ alt: config, src }) => {
    const classes = makeStyles(styles)();

    const [alt, imgClass] = config.split("/");

    return <img alt={alt} className={classes[imgClass]} src={src} />;
};

const Welcome = () => {
    const classes = makeStyles(styles)();
    const [welcomeText, setWelcomeText] = useState("");

    useEffect(() => {
        fetch(welcomeTextFile)
            .then((response) => {
                if (response.ok) return response.text();
                else return Promise.reject("Didn't fetch text correctly");
            })
            .then((text) => {
                setWelcomeText(text);
            })
            .catch((error) => console.error(error));
    });

    return (
        <>
            <img alt="" src={ERUPT2017Image} className={classes.headerImg} />
            {/* Render same header style on all pages */}
            <Typography variant="h4">Welcome, young and old!</Typography>
            {/* Render rest of text from markdown here */}
            <Markdown source={welcomeText} />
            {/* <Markdown renderers={{ image: Image }} source={welcomeText} /> */}
        </>
    );
};

export default Welcome;
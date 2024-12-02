import { History } from "../models/history";

export const academicHistory: History[] = [
    {
        title: "Bachelor of Science in Computer Science",
        institution: "ZHAW School of Engineering",
        logo: {
            srcImage: "zhaw.png",
            alt: "ZHAW Logo"
        },
        timePeriod: {
            dateFrom: new Date(2019, 8),
            dateUntil: new Date(2022, 6)
        },
        projects: [
            {
                title: "Bachelor Thesis",
                description: `Wrote a Thesis on: Analysis of turnover figures from the gastronomy
                            sector. The goal of the thesis was the analysis of the correlations
                            between the sales data in the restaurant sector provided by
                            Prognolite and the restaurant ratings.`
            }
        ]
    },
    {
        title: "Bachelor of Science in Mechatronics",
        institution: "ZHAW School of Engineering",
        logo: {
            srcImage: "zhaw.png",
            alt: "ZHAW Logo"
        },
        timePeriod: {
            dateFrom: new Date(2013, 8),
            dateUntil: new Date(2018, 6)
        },
        projects: [
            {
                title: "Bachelor Thesis",
                description: `Wrote a Thesis on: Navigation via stereo camera - a vision-based
                        navigation with Python and OpenCV, which used the information of
                        the 3D point cloud in a stereo image pair to determine the relative
                        position.`
            }
        ]
    },
];

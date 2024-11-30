import { History } from "../models/history";

export const assetsPath = "assets/images/institutions";
export const academicHistory: History[] = [
    {
        profession: "Bachelor of Science",
        institution: "ZHAW School of Engineering",
        logo: "zhaw.png",
        dateFrom: new Date(2019, 8),
        dateUntil: new Date(2022, 6),
        projects: [
            {
                title: "Bachelors in Computer Science",
                description: `Wrote a Thesis on: Analysis of turnover figures from the gastronomy
                            sector. The goal of the thesis was the analysis of the correlations
                            between the sales data in the restaurant sector provided by
                            Prognolite and the restaurant ratings.`
            }
        ]
    },
    {
        profession: "Bachelor of Science",
        institution: "ZHAW School of Engineering",
        logo: "zhaw.png",
        dateFrom: new Date(2013, 8),
        dateUntil: new Date(2018, 6),
        projects: [
            {
                title: "Bachelors in Mechatronics",
                description: `Wrote a Thesis on: Navigation via stereo camera - a vision-based
                        navigation with Python and OpenCV, which used the information of
                        the 3D point cloud in a stereo image pair to determine the relative
                        position.`
            }
        ]
    },
];

import { Service } from "../models/service";

const assetsPath = "assets/img/service";
export const service: Service[] = [
    {
        title: "Web Developer",
        icon: `${assetsPath}/web.png`
    },
    {
        title: "Frontend Developer",
        icon: `${assetsPath}/frontend.png`
    },
    {
        title: "Backend Developer",
        icon: `${assetsPath}/backend.png`
    },
    {
        title: "DevOps Engineer",
        icon: `${assetsPath}/dev-ops.png`
    }
];

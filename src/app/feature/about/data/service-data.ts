import { Service } from "../models/service";

const assetsPath = "assets/images/services";

export const service: Service[] = [
    {
        title: "Web Developer",
        icon: `web.png`
    },
    {
        title: "Frontend Developer",
        icon: `frontend.png`
    },
    {
        title: "Backend Developer",
        icon: `backend.png`
    },
    {
        title: "DevOps Engineer",
        icon: `dev-ops.png`
    }
].map(s => Object.assign(s, {icon: `${assetsPath}/${s.icon}`}));

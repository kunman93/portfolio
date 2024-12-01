import { assetsPath } from "assets/assets-path-index";
import { Service } from "../models/service";

export const service: Service[] = [
    {
        title: 'Web Developer',
        icon: {
            srcImage: 'web.png',
            alt: 'Web Icon'
        }
    },
    {
        title: "Frontend Developer",
        icon: {
            srcImage: 'frontend.png',
            alt: 'Frontend Icon'
        }
    },
    {
        title: 'Backend Developer',
        icon: {
            srcImage: 'backend.png',
            alt: 'Backend Icon'
        }
    },
    {
        title: "DevOps Engineer",
        icon: {
            srcImage: 'dev-ops.png',
            alt: 'DevOps Icon'
        }

    }
].map(s => Object.assign(s, {
    icon: {
        srcImage: `${assetsPath.services}/${s.icon.srcImage}`
    }
}));

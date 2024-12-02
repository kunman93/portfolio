import { SERVICES } from "assets/assets.constants";
import { Service } from "../models/service";

export const service: Service[] = [
    {
        title: 'Web Developer',
        icon: {
            srcImage: SERVICES.web,
            alt: 'Web Icon'
        }
    },
    {
        title: "Frontend Developer",
        icon: {
            srcImage: SERVICES.frontend,
            alt: 'Frontend Icon'
        }
    },
    {
        title: 'Backend Developer',
        icon: {
            srcImage: SERVICES.backend,
            alt: 'Backend Icon'
        }
    },
    {
        title: "DevOps Engineer",
        icon: {
            srcImage: SERVICES.devOps,
            alt: 'DevOps Icon'
        }

    }
];

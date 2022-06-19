import { Router } from "express";

export default interface IController {
    path: string;
    router: Router;

    intializeRoutes(): void;
}
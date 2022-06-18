import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Controller from './controllers/interfaces/controller.interface';

export default class App {
    public app: Application;
    public port: number;
    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        // Enable CORS middle-ware
        this.app.use(cors());
        // Enable express to use body-parser as middle-ware.
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
      }
     
      private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller: Controller) => {
          this.app.use('/api', controller.router);
        });
      }

      
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
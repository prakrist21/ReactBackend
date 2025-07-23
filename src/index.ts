import express from 'express'
import sequelize from 'config/config';
import { UserRouter } from '@routes/user.route';
import cors from "cors";
import { roleRouter } from '@routes/role.route';
import { CategoryRouter } from '@routes/category.route';
import { BlogRouter } from '@routes/blog.route';
import swaggerUIExpress from 'swagger-ui-express'
import { exceptionHandler } from '@config/exception-filter';
const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/user",UserRouter);
app.use("/api/role",roleRouter);
app.use("/api/category",CategoryRouter);
app.use("/api/blogs",BlogRouter);
app.use("/docs",swaggerUIExpress.serve,swaggerUIExpress.setup());
app.use(exceptionHandler);

sequelize.sync({alter:true}).then(()=>{
    app.listen(5000,()=>{
        console.log("http://localhost:5000")
    });
});


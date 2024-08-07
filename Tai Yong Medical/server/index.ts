import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './db';
import appointmentsR from './routes/appointmentsR';
import clientR from './routes/clientR';
import doctorsR from './routes/doctorsR';
import ordersR from './routes/ordersR';
import patientHistoryR from './routes/patienthistoryR';
import prostheticsR from './routes/prostheticsR';
import servicesReportsR from './routes/services_reportsR';
import servicesR from './routes/servicesR';
import newsR from './routes/newsR'
import path from 'path';

const app = express();
const port = 4200;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/appointments', appointmentsR);
app.use('/client', clientR);
app.use('/doctor', doctorsR);
app.use('/order', ordersR);
app.use('/patientHistory', patientHistoryR);
app.use('/prosthetic', prostheticsR);
app.use('/servicesReport', servicesReportsR);
app.use('/service', servicesR);
app.use('/news', newsR);

sequelize.authenticate()
    .then(() => {
        console.log('Подключение к базе данных MySQL успешно установлено');

        app.listen(port, () => {
            console.log(`Сервер запущен на порту ${port}`);
        });
    })
    .catch(err => {
        console.error('Ошибка подключения к базе данных: ', err);
    });
const express = require('express');
const path = require('path');
const cors = require('cors');  
const app = express();
const port = 8000;
const moment = require('moment');

require('moment/locale/es'); // Importar el locale español

moment.locale('es'); // Establecer español como idioma por defecto

require('./config/mongoose.config.js');

app.use('/Imagenes', express.static(path.join(__dirname, 'Imagenes')));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

const allRolRoutes = require('./routes/rol.routes');
allRolRoutes(app);

const allUserRoutes = require('./routes/user.routes');
allUserRoutes(app);

const allSchoolRoutes = require('./routes/school.routes');
allSchoolRoutes(app);

const allAcadTrainingRoutes = require('./routes/acadTraining.routes');
allAcadTrainingRoutes(app);

const allCertificationRoutes = require('./routes/certification.routes');
allCertificationRoutes(app);

const allWorkExperienceRoutes = require('./routes/workExperience.routes');
allWorkExperienceRoutes(app);

const allExternalCompanyRoutes = require('./routes/externalCompany.routes');
allExternalCompanyRoutes(app);

const allCompanyRoutes = require('./routes/company.routes');
allCompanyRoutes(app);

const allJobRoutes = require('./routes/job.routes');
allJobRoutes(app);

const allPostulationRoutes = require('./routes/postulation.routes');
allPostulationRoutes(app);

const allLogInRoutes = require('./routes/login.routes');
allLogInRoutes(app);

app.listen(port, () => console.log("Server is listening at port ", port));
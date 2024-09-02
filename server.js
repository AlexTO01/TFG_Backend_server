import express from 'express';
import cors from 'cors';
import { dataSource } from './src/infrastructure/persistence/postgresql/data-source.js';
import { UserSchema } from './src/infrastructure/persistence/postgresql/schemas/user-schema.js';
import { ExerciseSchema } from './src/infrastructure/persistence/postgresql/schemas/excercise-schema.js';
import { RoutineSchema } from './src/infrastructure/persistence/postgresql/schemas/routine-schema.js';
import { routine_exerciseSchema } from './src/infrastructure/persistence/postgresql/schemas/routine_has_exercise-schema.js';


const app = express();
const port = 4000;


app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true, // incluir cookies al enviar
}));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  response.header('Access-Control-Allow-Credentials', 'true');
  response.header('Access-Control-Allow-Methods', 'POST,PUT,GET,DELETE');
  next();
});

app.get('/login', async (req, res) => {
  const { email, password } = req.query;

  const usersRepository = dataSource.getRepository(UserSchema);
  const user = await usersRepository.findOne({ where: { email, password } });

  if (user) {
    res.status(200).json({ userExists: true });
    console.log('Login realizado');
  } else {
    res.status(401).json({ userExists: false, message: 'Usuario no encontrado' });
  }
});

app.post('/signin', async(req, res) => {
  const newUser = req.body
  var user

  const usersRepository = dataSource.getRepository(UserSchema)
  const exist = await usersRepository.existsBy(newUser);

  if (exist === true){
    res.status(401).json({ message: 'Usuario ya registrado' });
    console.log('Usuario existente')
  } else {
    // user = await usersRepository.save(newUser)
    const entity = {
      name: newUser.name,
      password: newUser.password,
      email: newUser.email,
      routine_id: newUser.routine_id,
      routine_dayOfWeek:  newUser.routine_dayOfWeek
    }

    console.log(entity)
    user = await usersRepository.save(entity)
  }

  res.status(200)
  res.json(user)

  console.log('Signin realizado')
});

app.get('/exercises', async(req, res) => {
  const exercisesRepository = dataSource.getRepository(ExerciseSchema)
  const exercises = await exercisesRepository.find()

  if (exercises){

    res.status(200).json({ exercisesExist: true , exercises});
    console.log('Hay ejercicios')
    

  } else {
    res.status(401).json({ exercisesExist: false, message: 'No hay ejercicios'})
  }
});

app.post('/exercise', async (req, res) => {
  const newExercise = req.body;
  
  const exerciseRepository = dataSource.getRepository(ExerciseSchema);

  try {
    const exercise = await exerciseRepository.save(newExercise);
    res.status(201).json(exercise);
    console.log('Ejercicio creado');
  } catch (error) {
    console.error('Error al crear el ejercicio:', error);
    res.status(500).json({ message: 'Error al crear el ejercicio' });
  }
});


app.get('/routines', async(req, res) =>{
  const routineRepository = dataSource.getRepository(RoutineSchema)
  const routines = await routineRepository.find()

  if (routines){
    res.status(200).json({ routinesExist: true , routines});
    console.log('Hay rutinas')
  }else {
    res.status(401).json({ exercisesExist: false, message: 'No hay rutinas'})
  }
});

app.post('/routines', async (req, res) => {
  const newRoutine = req.body;
  
  const routineRepository = dataSource.getRepository(RoutineSchema);

  try {
    const routine = await routineRepository.save(newRoutine);
    res.status(201).json(routine);
    console.log('Rutina creada');
  } catch (error) {
    console.error('Error al crear la rutina:', error);
    res.status(500).json({ message: 'Error al crear la rutina' });
  }
});


app.get('/rutineXexercise', async(req, res) => {
  const routinexexerciseRepository = dataSource.getRepository(routine_exerciseSchema)
  const routinesxexercise = await routinexexerciseRepository.find()

  if (routinesxexercise){
    res.status(200).json(routinesxexercise);
    console.log('Hay ejercicios en las rutinas')
  }else {
    res.status(401).json({ exercisesExist: false, message: 'No hay rutinas'})
  }
});

app.post('/rutineXexercise', async (req, res) => {
  const newRoutineExercise = req.body;
  
  const routineExerciseRepository = dataSource.getRepository(routine_exerciseSchema);

  try {
    const routineExercise = await routineExerciseRepository.save(newRoutineExercise);
    res.status(201).json(routineExercise);
    console.log('Relación rutina-ejercicio creada');
  } catch (error) {
    console.error('Error al crear la relación rutina-ejercicio:', error);
    res.status(500).json({ message: 'Error al crear la relación rutina-ejercicio' });
  }
});



await dataSource.initialize()

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});

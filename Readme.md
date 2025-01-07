# GUVI - DAY 42

## URL Shortener TASK.

### How to run the project on your machine:

1. clone the repository to your local machine.

```
git clone
```

2. To install all the dependencies:

```
npm i express
npm i nodemon --save-dev
npm i cookie-parser
npm i jsonwebtoken
npm i bcrypt
npm i cors
npm i dotenv
npm i mongoose
npm i nodemailer
```

3. Once everything is installed successfully, now it's time to run the server.

```
npm run dev
```

### Dependencies used

1. express

```
    npm i express
```

2. nodemon

```
    npm i nodemon --save-dev
```

3. bcrypt

```
    npm i bcrypt
```

4. cors

```
    npm i cors
```

5. dotenv

```
    npm i dotenv
```

6. mongoose

```
    npm i mongoose
```

7. nodemailer

```
    npm i nodemailer
```

8. cookie-parser

```
    npm i cookie-parser
```

9. jsonwebtoken

```
    npm i jsonwebtoken
```

### Setup.

1. Run the following command to create a new project.

```
    npm init -y
    npm i express
    npm i cookie-parser
    npm i jsonwebtoken
    npm i nodemon --save-dev
    npm i bcrypt
    npm i cors
    npm i dotenv
    npm i mongoose
    npm i nodemailer
```

2. We create a javascript file named `index.js` which is the root of the project.

3. We change the `package.json` file to include start and dev parameter to make the script run from the command `npm run dev`.

## users data structure

```json
{ userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  weight: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
  height: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
  BMI: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
  calories: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      totalCaloriesBurned: {
        type: Number,
        required: true,
      },
      totalCaloriesConsumed: {
        type: Number,
        required: true,
      },
      totalCaloriesGoal: {
        type: Number,
        required: true,
      },
      remainingCaloriestoGoal: {
        type: Number,
        required: true,
      },
    },
  ],
  suggestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suggestion",
    },
  ],
  otp: {
    type: Number,
    default: "",
  },
}
```

## food data structure

```json
{
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbohydrates: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}
```

## goal data structure

```json
{
   goalName: {
    type: String,
    required: true,
  },
  goalDescription: {
    type: String,
    required: true,
  },
  targetDate: {
    type: String,
    default: null,
  },
  targetCaloriesValue: {
    type: Number,
    default: null,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
}
```

## suggestion data structure

```json
{
 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  age: {
    type: String,
    enum: ["0-18", "18-30", "31-50", "50-100"],
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  stage: {
    type: String,
    enum: ["Under weight", "Normal weight", "Over weight", "Obese"],
    required: true,
  },
  type: {
    type: String,
    enum: ["exercise", "food", "goal"],
    required: true,
  },
  details: {
    type: Object,
    required: true,
  },
}
```

## exercise data structure

```json
{
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  exerciseType: {
    type: String,
    required: true,
  },
  caloriesBurnt: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}
```

# API endpoints

- Explain in postman document

# Deployed URL

- 

# POSTMAN DOCUMENT URL

- https://documenter.getpostman.com/view/34880027/2sA3kbfyBb

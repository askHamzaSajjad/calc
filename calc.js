const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{return res.send("Hello, world!")})
app.post("/calories", (req, res) => {
  const { age, gender, height, weight, activity_level } = req.body;

  // Convert height to centimeters
  const heightInCm = height * 30.48;

  // Convert weight to kilograms
  const weightInKgs = weight * 0.453592;

  // Calculate BMR using Mifflin-St Jeor equation
  let bmr;
  if (gender === 'male') {
    bmr = (10 * weightInKgs) + (6.25 * heightInCm) - (5 * age) + 5;
  } else {
    bmr = (10 * weightInKgs) + (6.25 * heightInCm) - (5 * age) - 161;
  }

  // Calculate daily calories based on BMR and activity level
  const activityFactors = {
    inactive: 1.1,
    Somewhat_active: 1.2187,
    active: 1.55,
    very_active: 1.725,
  };
  const dailyCalories = bmr * activityFactors[activity_level];

  res.json({ bmr, dailyCalories });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

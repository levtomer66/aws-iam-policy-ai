const express = require('express')
const axios = require("axios");

const app = express()
const port = 3000


app.use("/", express.static('./client'))

app.use(express.json()); //Used to parse JSON bodies
const API_TOKEN = process.env.OPENAI_API_TOKEN


app.post('/api', (req, res) => {
    const text = req.body.text

    axios.post(
        'https://api.openai.com/v1/completions',
        {
            model: 'text-davinci-003',
            prompt: `Please provide AWS IAM Policy document by the following free text: ${text}. Provide policy only, without any futher explnation.`,
            max_tokens: 256,
            temperature: 0
        },
        {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }
    )
        .then((response) => {
            const responseText = response.data.choices[0]['text']
            console.log(responseText);
            res.send(responseText);
        })
        .catch((error) => {
            console.error(error);
            res.status(500);
            res.send(error.message)
        });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

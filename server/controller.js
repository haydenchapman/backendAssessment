module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortune = ['The fortune you seek is in another cookie?','A foolish man listens to his heart. A wise man listens to cookies.', 'You will live long enough to open many fortune cookies.', 'We don’t know the future, but here’s a cookie.', 'Help! I am being held prisoner in a fortune cookie factory.', 'Actions speak louder than fortune cookies.'];
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * fortune.length);
        let randomFortunes = fortune[randomIndex];
      
        res.status(200).send(randomFortunes);
    }
    
}
const commission = 'commission';
const interest = 'interest';
const capitalization = 'capitalization';

const randomNumber = type => {
   switch (type) {
      case commission:
         return Math.floor(Math.random() * 15) + 1;
      case capitalization:
         return Math.floor(Math.random() * 6) + 5;
      case interest:
         return Math.floor(Math.random() * 5) + 1;
   }
};

module.exports = [
   {
      id: 1,
      name: 'bank1',
      cash: 15000,
      commission: randomNumber(commission),
      capitalizationTime: randomNumber(capitalization),
      interestRate: randomNumber(interest),
   },
   {
      id: 2,
      name: 'bank2',
      cash: 15000,
      commission: randomNumber(commission),
      capitalizationTime: randomNumber(capitalization),
      interestRate: randomNumber(interest),
   },
   {
      id: 3,
      name: 'bank3',
      cash: 15000,
      commission: randomNumber(commission),
      capitalizationTime: randomNumber(capitalization),
      interestRate: randomNumber(interest),
   },
   {
      id: 4,
      name: 'bank4',
      cash: 15000,
      commission: randomNumber(commission),
      capitalizationTime: randomNumber(capitalization),
      interestRate: randomNumber(interest),
   },
];

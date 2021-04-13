const banksAccounts = require('./banks');

let banks = banksAccounts;
let newBankWithHighterInterestRate;
let actualBankWithHighterInterestRate = undefined;
let makeTransfer;

// kapitalizacja odsetek
const capitalizationOfInterest = arr => {
   for (let i = 0; i < arr.length; i++) {
      const { capitalizationTime } = arr[i];
      setInterval(() => {
         const bank = banks[i];
         const { cash, interestRate } = bank;
         const interest = cash * (interestRate / 100);
         banks[i].cash = cash + interest;
         changeRandomInterest();
      }, capitalizationTime * 1000);
   }
};

// zmiana oprocentowania
const changeRandomInterest = () =>
   banks.forEach(
      item => (item.interestRate = Math.floor(Math.random() * 5) + 1)
   );

// sprawdzanie ktory bank ma największe oprocentowanie
const sortingInterestsRate = () => {
   const banksList = banks;
   let sorted = banksList.sort((a, b) => {
      return a.interestRate - b.interestRate;
   });

   newBankWithHighterInterestRate = sorted[3];
};

// wykonanie przelewu 50% środków do banku z najwiekszym oprocentowaniem
const transferToHigherInterestRate = () => {
   sortingInterestsRate();
   // sprawdzenie czy przelew się opłaca (czy prowizja nie jest za duza)
   if (actualBankWithHighterInterestRate !== undefined) {
      const { commission } = actualBankWithHighterInterestRate;
      const { interestRate } = newBankWithHighterInterestRate;
      commission > interestRate
         ? (makeTransfer = false)
         : (makeTransfer = true);
   }

   if (makeTransfer === false) {
      return;
   }

   actualBankWithHighterInterestRate = newBankWithHighterInterestRate;

   const OthersBanks = banks.filter(
      item => item.id !== newBankWithHighterInterestRate.id
   );

   let totalFoundsOfAnotherAcc = 0;
   // kwota przelewu do banku
   OthersBanks.map(bank => {
      const { cash } = bank;
      totalFoundsOfAnotherAcc += cash / 2;
   });

   // zmiany w tablicy banków po "przelewie"
   const actualBanksList = banks.map(item => {
      const { id } = item;
      // do banku z najwiekszym oprocentowaniem dodaj kwote z innych bankow
      if (id === newBankWithHighterInterestRate.id) {
         const newCash = (item.cash += totalFoundsOfAnotherAcc);
         return {
            ...item,
            cash: newCash,
         };
      } else {
         // od reszty odejmij kwotę przelewu + prowizja
         const transferCommision = (item.cash / 2) * (item.commission / 100); // prowizja od przelewu 50% srodków
         const newCash = item.cash / 2 - transferCommision;
         return {
            ...item,
            cash: newCash,
         };
      }
   });

   // nadpisanie tablicy banków aktualnym stanem
   banks = actualBanksList;
};

setInterval(() => transferToHigherInterestRate(), 10);

// wyswietlanie informacji o stanie kont
setInterval(() => {
   let totalCash = 0;
   banks.forEach(item => {
      const { name, cash } = item;
      console.log(`${name}: ${cash.toFixed(2)}`);
      totalCash += cash;
   });
   console.log(`Total Cash:${totalCash.toFixed(2)}`);
}, 60000);

capitalizationOfInterest(banks);

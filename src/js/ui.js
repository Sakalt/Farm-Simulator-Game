//Weekly Production Table
const WeeklyProductionAnimal = document.querySelector("#WeeklyProductionAnimal");
const WeeklyProductionPlant = document.querySelector("#WeeklyProductionPlant");

//Weekly Production Table
const Inventory = document.querySelector("#Inventory");

//Statistics
const TotalFarmValue = document.querySelector("#TotalFarmValue");
const Money = document.querySelector("#Money");
const WeekCounter = document.querySelector("#WeekCounter");
const FeedConsumption = document.querySelector("#FeedConsumption");
const FertilizerConsumption = document.querySelector("#FertilizerConsumption");

//WeeklyPrices
const ProductionPrices = document.querySelector("#ProductionPrices");
const ProductPrices = document.querySelector("#ProductPrices");

//Marketplace
const MarketplaceBuySelect = document.querySelector("#MarketplaceBuySelect");
const MarketplaceBuyForm = document.querySelector("#MarketplaceBuyForm");
MarketplaceBuyForm.value = 0
const MarketplaceBuyButton = document.querySelector("#MarketplaceBuyButton");
//
const MarketplaceSellSelect = document.querySelector("#MarketplaceSellSelect");
const MarketplaceSellForm = document.querySelector("#MarketplaceSellForm");
MarketplaceSellForm.value = 0
const MarketplaceSellButton = document.querySelector("#MarketplaceSellButton");
//
const SupermarketBuySelect = document.querySelector("#SupermarketBuySelect")
const SupermarketBuyForm = document.querySelector("#SupermarketBuyForm");
SupermarketBuyForm.value = 0
const SupermarketBuyButton = document.querySelector("#SupermarketBuyButton");
//
const SupermarketSellSelect = document.querySelector("#SupermarketSellSelect");
const SupermarketSellForm = document.querySelector("#SupermarketSellForm");
SupermarketSellForm.value = 0
const SupermarketSellButton = document.querySelector("#SupermarketSellButton");

//Variables
let week = 1;
let weeklyFeedConsumption = 0;
let weeklyFertilizerConsumption = 0;
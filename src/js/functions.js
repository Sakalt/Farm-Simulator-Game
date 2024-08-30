// Pricing Function (価格更新関数)
function Pricing() {
    function getRandomCoefficient(min, max) {
        return Math.random() * (max - min) + min;
    }
    for (let i of animalList) {
        i.lastLastPrice = i.lastPrice;
        i.lastPrice = i.price;
        i.price = Math.round(i.price * getRandomCoefficient(0.97, 1.03) * 100) / 100;
    }
    for (let i of plantList) {
        i.lastLastPrice = i.lastPrice;
        i.lastPrice = i.price;
        i.price = Math.round(i.price * getRandomCoefficient(0.94, 1.07) * 100) / 100;
    }
    for (let i of productionList) {
        i.lastLastPrice = i.lastPrice;
        i.lastPrice = i.price;
        i.price = Math.round(i.price * getRandomCoefficient(0.9, 1.1) * 100) / 100;
    }
}

// Production Function (生産関数)
function Production() {
    milk.number += cow.number * cow.productionCoefficient;
    wool.number += sheep.number * sheep.productionCoefficient;
    egg.number += chicken.number * chicken.productionCoefficient;
    fabric.number += cotton.number * cotton.productionCoefficient;
    fame.number += wheat.number * wheat.productionCoefficient;
    oil.number += sunflower.number * sunflower.productionCoefficient;
}

// Weekly Consumption (週次消費)
function WeeklyConsumption() {
    // Feed Consumption (飼料消費)
    for (let i of animalList) {
        feed.number -= i.consumptionCoefficient * i.number;
    }
    if (feed.number < 0) {
        alert("飼料が不足しています。マーケットプレイスで飼料を購入しないと、次の週には動物が死んでしまいます。");
        alert("1頭の牛、2匹の羊、5羽の鶏が死んでしまいます。");
        cow.number -= 1;
        sheep.number -= 2;
        chicken.number -= 5;
        feed.number = 0;
    }
    for (let i of animalList) {
        if (i.number < 0) {
            i.number = 0;
        }
    }
    weeklyFeedConsumption = Math.floor(feed.number / (cow.number * cow.consumptionCoefficient + sheep.number * sheep.consumptionCoefficient + chicken.number * chicken.consumptionCoefficient));

    // Fertilizer Consumption (肥料消費)
    for (let i of plantList) {
        fertilizer.number -= i.consumptionCoefficient * i.number;
    }
    if (fertilizer.number < 0) {
        alert("肥料が不足しています。マーケットプレイスで肥料を購入しないと、次の週には植物が枯れてしまいます。");
        alert("1つの綿花、2つの小麦、2つのひまわりが枯れてしまいます。");
        cotton.number -= 1;
        wheat.number -= 2;
        sunflower.number -= 2;
        fertilizer.number = 0;
    }
    for (let i of plantList) {
        if (i.number < 0) {
            i.number = 0;
        }
    }
    weeklyFertilizerConsumption = Math.floor(fertilizer.number / (cotton.number * cotton.consumptionCoefficient + wheat.number * wheat.consumptionCoefficient + sunflower.number * sunflower.consumptionCoefficient));
}

// Marketplace Buy Function (マーケットプレイス購入関数)
function MarketplaceBuy() {
    if (MarketplaceBuyForm.value < 1) {
        alert("1以上の数を入力してください");
    } else {
        if (Number(MarketplaceBuyForm.value) > Math.floor((myFarm.money - productList[Number(MarketplaceBuySelect.value)].price) * Number(MarketplaceBuyForm.value))) {
            alert("お金が足りません。");
        } else {
            myFarm.money -= Number(MarketplaceBuyForm.value) * productList[Number(MarketplaceBuySelect.value)].price;
            productList[Number(MarketplaceBuySelect.value)].number += Number(MarketplaceBuyForm.value);
            ClearAllItems();
            DisplayAllItems();
        }
    }
}

// Marketplace Sell Function (マーケットプレイス販売関数)
function MarketplaceSell() {
    if (MarketplaceSellForm.value < 1) {
        alert("1以上の数を入力してください");
    } else {
        if (Number(MarketplaceSellForm.value) > productList[Number(MarketplaceSellSelect.value)].number) {
            alert("在庫が足りません。");
        } else {
            myFarm.money += Number(MarketplaceSellForm.value) * productList[Number(MarketplaceSellSelect.value)].price;
            productList[Number(MarketplaceSellSelect.value)].number -= Number(MarketplaceSellForm.value);
            ClearAllItems();
            DisplayAllItems();
        }
    }
}

// Supermarket Buy Function (スーパーマーケット購入関数)
function SupermarketBuy() {
    if (SupermarketBuyForm.value < 1) {
        alert("1以上の数を入力してください");
    } else {
        if (Number(SupermarketBuyForm.value) > Math.floor((myFarm.money - productionList[Number(SupermarketBuySelect.value)].price) * Number(SupermarketBuyForm.value))) {
            alert("お金が足りません。");
        } else {
            myFarm.money -= Number(SupermarketBuyForm.value) * productionList[Number(SupermarketBuySelect.value)].price;
            productionList[Number(SupermarketBuySelect.value)].number += Number(SupermarketBuyForm.value);
            ClearAllItems();
            DisplayAllItems();
        }
    }
}

// Supermarket Sell Function (スーパーマーケット販売関数)
function SupermarketSell() {
    if (SupermarketSellForm.value < 1) {
        alert("1以上の数を入力してください");
    } else {
        if (Number(SupermarketSellForm.value) > productionList[Number(SupermarketSellSelect.value)].number) {
            alert("在庫が足りません。");
        } else {
            myFarm.money += Number(SupermarketSellForm.value) * productionList[Number(SupermarketSellSelect.value)].price;
            productionList[Number(SupermarketSellSelect.value)].number -= Number(SupermarketSellForm.value);
            ClearAllItems();
            DisplayAllItems();
        }
    }
}

// Display All Items Function (全アイテム表示関数)
function DisplayAllItems() {
    // Weekly Production Table (週次生産テーブル)
    let x = 1;
    for (let i of animalList) {
        WeeklyProductionAnimal.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <th scope="row">${x++}</th>
                <td>${i.name}</td>
                <td>${i.number}</td>
                <td>${i.weeklyProduction(i.number, i.productionCoefficient) + " " + i.productName}</td>
            </tr>`
        );
    }
    for (let i of plantList) {
        WeeklyProductionPlant.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <th scope="row">${x++}</th>
                <td>${i.name}</td>
                <td>${i.number}</td>
                <td>${i.weeklyProduction(i.number, i.productionCoefficient) + " " + i.productName}</td>
            </tr>`
        );
    }

    // Inventory Table (在庫テーブル)
    let y = 1;
    for (let i of productionList) {
        Inventory.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <th scope="row">${y++}</th>
                <td>${i.name}</td>
                <td>${i.number}</td>
            </tr>`
        );
    }

    // Statistics Table (統計テーブル)
    myFarm.totalFarmValue = 0;
    TotalFarmValue.innerHTML = myFarm.TotalFarmValue();
    Money.innerHTML = myFarm.money;
    WeekCounter.innerText = `${week} week`;
    week++;
    FeedConsumption.innerHTML = `${weeklyFeedConsumption} week`;
    FertilizerConsumption.innerHTML = `${weeklyFertilizerConsumption} week`;

    // Prices Table (価格テーブル)
    let z = 1;
    for (let i of productList) {
        ProductionPrices.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <th scope="row">${z++}</th>
                <td>${i.name}</td>
                <td>${i.price}</td>
                <td>${i.lastPrice}</td>
                <td>${i.lastLastPrice}</td>
            </tr>`
        );
    }
    let k = 1;
    for (let i of productionList) {
        ProductPrices.insertAdjacentHTML(
            "beforeend",
            `<tr>
            <th scope="row">${k++}</th>
                <td>${i.name}</td>
                <td>${i.price}</td>
                <td>${i.lastPrice}</td>
                <td>${i.lastLastPrice}</td>
             </tr>`
        );
    }

    // Marketplace Table (マーケットプレイステーブル)
    // Buy (購入)
    let l = 0;
    for (let i of productList) {
        MarketplaceBuySelect.insertAdjacentHTML("beforeend", `<option value="${l}">${i.name}</option>`);
        l++;
    }
    // Sell (販売)
    let m = 0;
    for (let i of productList) {
        MarketplaceSellSelect.insertAdjacentHTML("beforeend", `<option value="${m}">${i.name}</option>`);
        m++;
    }
}

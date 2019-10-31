class Card7 {

    __getCardType( cardNum ) {
        var payCardType = "";
		var payCardLen = 0;
        var regexMap = [
            {regEx: /^4[0-9]{5}/ig,cardType: "VISA", cardLength: "16"},
            {regEx: /^5[1-5][0-9]{4}/ig,cardType: "MASTERCARD", cardLength: "16"},
            //{regEx: /^3[47][0-9]{3}/ig,cardType: "AMEX"},
            {regEx: /^(506[01][0-9][0-9]|6500(0[2-9]|1[0-9]|2[0-7]))/ig,cardType: "VERVE", cardLength: "19"},
            //{regEx: /^(5[06-8]\d{4}|6\d{5})/ig,cardType: "MAESTRO"},
        ];
        
        for (var j = 0; j < regexMap.length; j++) {
            if (cardNum.match(regexMap[j].regEx)) {
                payCardType = regexMap[j].cardType;
				payCardLen = regexMap[j].cardLength;
                break;
            }
        }
        
        return {type: payCardType, length: payCardLen}
    }

    guessCard(b,e) {
		if(typeof e === "undefined"){
			e = ""
        }
		if(!b) {
			return "Supply atlest 6 digits from the begining of the card"
        }
	let c = this.__getCardType(b);

        let card = '';
		let i = parseInt(c.length) - b.length - e.length;

        let init = "9".repeat(i)
        let stop = false

        while(parseInt(init) >= 0 && !stop){
			console.log(init)
           let zeros = i - String(init).length;
           card = b + "0".repeat(zeros) + init + e;
           if(this.__checkIsValidCC(card)) {
               stop = true;
           }
           init--
        }

        return {
            cardNum: card,
            cardType: c.type
        }
    }

    __checkIsValidCC(data) {
        let _data = data.split(" ").join("").split("").reverse();
        let s = 0;
        _data.forEach( (d, i) => {
            d = parseInt(d, 10);
            if(i%2 === 0) {
                d = ( d*= 2 > 9 ) ? d - 9 : d;
            } 
            s+=d;
        });

        return s % 10 === 0;
    }
}

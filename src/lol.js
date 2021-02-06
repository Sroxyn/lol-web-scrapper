const cheerio = require('cheerio')
const request = require('request-promise');

module.exports = {
    async getHero(hero,lang) {
    if(!hero)return console.error("You Must specify a Hero")
    if(!lang)return console.error("You Must specify a Language only (tr,en)")
    let url;
    let url2 = `https://mobatr.net/sampiyon/${encodeURI(hero)}/counter-ct`
    let url3;
    if(lang === 'tr'){
        url = `https://tr.leagueoflegends.com/tr-tr/champions/${encodeURI(hero)}/`
        url3 = `https://www.leagueofgraphs.com/tr/champions/builds/${encodeURI(hero)}`
    }
    else if(lang === 'en'){
        url = `https://na.leagueoflegends.com/en-us/champions/${encodeURI(hero)}/`
        url3 = `https://www.leagueofgraphs.com/en/champions/builds/${encodeURI(hero)}`
    }else return console.error("You must specify a valid language only(tr,en)")

    var all = {}
    const response = await request(url);
    const response2 = await request(url2)
    const response3 = await request(url3)
    const $ = cheerio.load(response);
    const $$ = cheerio.load(response2);
    const $$$ = cheerio.load(response3);
    let kostum_link = $('div[class="style__Slideshow-sc-1tlyqoa-2 gUBieu"]').children('div').children('div').children('img')
    let kostum_ad = $('div[class="swiper-wrapper"]').children('li').children('button').children('label')
    

    var skin_resim = []
    var skin_link = []
    var zayıf_oldugu = [];
    var best_plays = []
    var started_Item = []
    
    kostum_ad.each(function(i, x) { skin_resim[i] = $(x).text()});
    kostum_link.each(function(i, x) { skin_link[i] = $(x).attr('src')});

    $$('div[class="c-guides__list list-unstyled"]').children('div').each(function(i, element){
       zayıf_oldugu[i] = $$(element).find('a').text()
    })

    $$$('table[class="data_table overviewChampionBestPlayers"]').children('tbody').children('tr').each(function(i,element){
        best_plays[i] = $$$(element).find('span').eq(0).text().trim()
    })
    $$$('div[class="iconsRow"]').children('div').each(function(i,element){
        started_Item[i] = $$$(element).find('img').attr('alt')
    })

        this.title = $('strong[class="style__Title-sc-14gxj1e-3 iLTyui"]').find('span').text()
        this.description = $('span[class="style__Intro-sc-14gxj1e-2 fmCNnE"]').children('div').children('span').text()
        this.hero_image = $('div[class="style__ForegroundAsset-sc-1o884zt-4 cVdVkh"]').children('img').attr('src') 
        this.hardness = $('ul[class="style__SpecsList-sc-1o884zt-11 mFnFm"]').children('li').eq(1).children('div').eq(2).text()
        this.rol = $('ul[class="style__SpecsList-sc-1o884zt-11 mFnFm"]').children('li').eq(0).children('div').eq(2).text()
        this.Weaknes = zayıf_oldugu.slice(0,5)
        this.Strong = zayıf_oldugu.slice(5,10)
        this.bestPlayers = best_plays.slice(1,5)
        this.Winrate = $$$('div[class="medium-24 columns"]').children('div').children('div').eq(0).children('div').eq(1).children('div').children('div').text().trim().slice(0,5)
        this.banRate = $$$('div[class="medium-24 columns"]').children('div').children('div').eq(0).children('div').eq(2).children('div').children('div').text().trim().slice(0,5)
        this.StartedItems = started_Item.slice(3,6)
        this.coreBuild = started_Item.slice(7,10)
        this.boots = started_Item.slice(10,11)
        this.endBuild = started_Item.slice(11,14)
        this.skins = [ skin_resim,skin_link ]
        this.passive_skil = {
            title: $('ol[class="style__AbilityInfoList-ulelzu-7 kAlIxD"]').children('li').eq(0).children('h5').text(),
            desc: $('ol[class="style__AbilityInfoList-ulelzu-7 kAlIxD"]').children('li').eq(0).children('p').text(),
            image: $('div[class="style__OptionList-sc-18a4qs7-3 ibygfd"]').children('button').eq(0).children('span').eq(0).children('span').eq(0).children('img').attr('src'),
            video: $('div[class="style__VideoContainer-tmew42-2 cvZjKa"]').children('div').eq(0).children('div').children('video').children('source').attr('src')
        }

        this.q_skil = {
            title: $('ol[class="style__AbilityInfoList-ulelzu-7 kAlIxD"]').children('li').eq(1).children('h5').text(),
            desc: $('ol[class="style__AbilityInfoList-ulelzu-7 kAlIxD"]').children('li').eq(1).children('p').text(),
            image: $('div[class="style__OptionList-sc-18a4qs7-3 ibygfd"]').children('button').eq(1).children('span').eq(0).children('span').eq(0).children('img').attr('src'),
            video: $('div[class="style__VideoContainer-tmew42-2 cvZjKa"]').children('div').eq(1).children('div').children('video').children('source').attr('src')
        }

        this.w_skil = {
            title: $('ol[class="style__AbilityInfoList-ulelzu-7 kAlIxD"]').children('li').eq(2).children('h5').text(),
            desc: $('ol[class="style__AbilityInfoList-ulelzu-7 kAlIxD"]').children('li').eq(2).children('p').text(),
            image: $('div[class="style__OptionList-sc-18a4qs7-3 ibygfd"]').children('button').eq(2).children('span').eq(0).children('span').eq(0).children('img').attr('src'),
            video: $('div[class="style__VideoContainer-tmew42-2 cvZjKa"]').children('div').eq(2).children('div').children('video').children('source').attr('src')
        }

        this.e_skil = {
            title: $('ol[class="style__AbilityInfoList-ulelzu-7 kAlIxD"]').children('li').eq(3).children('h5').text(),
            desc: $('ol[class="style__AbilityInfoList-ulelzu-7 kAlIxD"]').children('li').eq(3).children('p').text(),
            image: $('div[class="style__OptionList-sc-18a4qs7-3 ibygfd"]').children('button').eq(3).children('span').eq(0).children('span').eq(0).children('img').attr('src'),
            video: $('div[class="style__VideoContainer-tmew42-2 cvZjKa"]').children('div').eq(3).children('div').children('video').children('source').attr('src')
        }

        this.r_skil = {
            title: $('ol[class="style__AbilityInfoList-ulelzu-7 kAlIxD"]').children('li').eq(4).children('h5').text(),
            desc: $('ol[class="style__AbilityInfoList-ulelzu-7 kAlIxD"]').children('li').eq(4).children('p').text(),
            image: $('div[class="style__OptionList-sc-18a4qs7-3 ibygfd"]').children('button').eq(4).children('span').eq(0).children('span').eq(0).children('img').attr('src'),
            video: $('div[class="style__VideoContainer-tmew42-2 cvZjKa"]').children('div').eq(4).children('div').children('video').children('source').attr('src')
        }

        return this;
        
    }
 }

const cheerio = require('cheerio')
const request = require('request-promise');

module.exports = {
    async getHero(hero,lang) {
    if(!hero)return console.error("You Must specify a Hero")
    if(!lang)return console.error("You Must specify a Language only (tr,en)")
    let url;
    if(lang === 'tr'){
        url = `https://tr.leagueoflegends.com/tr-tr/champions/${hero}/`
    }
    else if(lang === 'en'){
        url = `https://na.leagueoflegends.com/en-us/champions/${hero}/`
    }else return console.error("You must specify a valid language only(tr,en)")

    const response = await request(url);
    const $ = cheerio.load(response);
        this.title = $('strong[class="style__Title-sc-14gxj1e-3 iLTyui"] > span').text()
        this.description = $('span[class="style__Intro-sc-14gxj1e-2 fmCNnE"]').children('div').children('span').text()
        this.hero_image = $('div[class="style__ForegroundAsset-sc-1o884zt-4 cVdVkh"]').children('img').attr('src') 
        this.hardness = $('ul[class="style__SpecsList-sc-1o884zt-11 mFnFm"]').children('li').eq(1).children('div').eq(2).text()
        this.rol = $('ul[class="style__SpecsList-sc-1o884zt-11 mFnFm"]').children('li').eq(0).children('div').eq(2).text()
        let kostum_link = $('div[class="style__Slideshow-sc-1tlyqoa-2 gUBieu"]').children('div').children('div').children('img')
        let kostum_ad = $('div[class="swiper-wrapper"]').children('li').children('button').children('label')
  
        var skin_resim = []
        var skin_link = []

        kostum_ad.each(function(i, x) { skin_resim[i] = $(x).text()});
        kostum_link.each(function(i, x) { skin_link[i] = $(x).attr('src')});


        this.skins = [
            skin_resim,skin_link
        ]

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

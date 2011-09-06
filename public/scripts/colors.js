// The following returns R, G or B from HEX codes _without #_
function r(hex) { 
  return parseInt((hex).substring(0,2),16)
}
function g(hex) {
  return parseInt((hex).substring(2,4),16)
}
function b(hex) { 
  return parseInt((hex).substring(4,6),16)
}

// The following returns HSL from RGB
function hsl(r, g, b){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
      h = s = 0; // achromatic
  }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  return [Math.floor(h * 360)+', '+Math.floor(s * 100)+'%, '+Math.floor(l * 100)+'%'];
}

function markup_color(e) {
  var rgb_for_object = r(e)+', '+g(e) +', '+b(e),
      hsl_for_object = hsl(r(e), g(e), b(e));
  // id="color-'+$.inArray(e, a)+'"
  return '<section class="color" style="background: #'+e+'"><header class="color_value" data-hex="'+e+'" data-rgb="'+rgb_for_object+'" data-hsl="'+hsl_for_object+'"></header></section>'
}

// Defining the placeholder where the colors will be loaded and
// of course, the colors.
var $placeholder = $('#colors_placeholder'),
    colors = ['fff700','fffa81','fff664','ffef61','ffeb79','fff0ac','ffee80','ffde7e','ffd68c','fed16e','fed394','faab72','eb0079','fff964','fff346','ffec50','ffe564','ffe790','ffe767','fec753','fec674','fdbe4c','fcc787','f89253','00a6de','fff700','ffe800','ffe747','ffd646','fed062','ffdd60','fbb72f','fbac4d','faae33','faa756','f6823b','1b1919','fff500','ffde00','ffd900','fdc72b','fab211','fab200','f8a018','f89017','f68000','f57a00','f25b00',false,'d0bc00','e7b300','d4a900','fbb900','cc920b','e39b00','f78400','e57200','e26d00','f36a00','dd4606',false,'ab9b06','a89308','b18c04','be900a','a4801b','a1750f','bd740d','925712','9a5411','ca5f0a','8a3210',false,'726a24','8c7d0f','776f15','967810','7a6218','5f4f15','694b13','573810','54421d','944511','391705','fedeab','fcbd99','fdc4a1','f99e85','fbb5a9','faabaa','f995a2','fbb0b9','fbb5bf','f89db2','fbbbcc','fcc6ce','fcc382','f9a075','f99e7d','f88e6e','f78773','f47575','f78493','f4597b','f88b9e','f67192','f78ead','f890a5','f89450','f78642','f57b43','f57a59','f46e49','f14d52','f03a57','ef2d52','f2426e','f13367','f23b7a','f02b63','f3650f','f36a06','f25b00','f25c1d','f1521c','ee1b2c','ee052b','ed0045','ed0030','eb0040','eb004e','ea0039','df4904','ea5000','f04b00','f04500','ed3913','ed0825','e6001b','d70023','e2002e','cf003b','db0045','cb0036','9e3f0f','9d3d10','c93c0f','ac2b10','952212','cc0026','b50029','9d002e','b2002c','93002f','ad003a','9a002b','4b250c','732e10','5f200d','762311','622221','6c0816','670118','48121e','690022','660d2c','890030','760024','f8a7c2','f794b4','f7b3cb','f384b2','f49dbf','f0a5c4','f2b6cd','edb2cb','e8bad1','e3c5d8','c5a1c4','be96be','f66fa1','f56a9d','f068a4','ea4f9a','ee71a8','e77fb0','ce66a2','db8fb8','cf91ba','c89fc3','b178ad','a477ad','f11777','f23587','ea007f','e20082','e5559b','d14694','b92689','c970a8','b0599c','8b4390','8a4792','8e5198','eb004b','ed006d','e60063','eb0076','da0085','c9338e','b3007f','aa1485','9a1e85','680474','7a2985','6f2482','b20040','e2005e','b20050','b7005e','d00077','c20082','a3007c','a4007c','941d84','550055','6e037a','621279','800035','af004c','930042','810045','a90064','a90078','980074','96007c','890c7f','450041','660575','5a126d','5d0028','720037','5b002e','55002f','7d0047','690043','780058','6d0055','68035d','3d0938','431046','4a0356','ae91bd','d8cdde','b8accc','a9aacc','969bc5','c0d3e5','bfdeec','accce2','9ecfe5','86c3e1','b5e2ec','71cee9','9274ad','b4a7ca','9c8ebd','8385b8','7477b0','8d9fc8','9ac4e0','4f7db6','7db6d9','52a5d1','8fd1e8','2fb5dd','6d4692','7c63a3','8069a7','6d6fab','554f97','3e4d96','3778b4','005199','3e85bc','0069aa','4ab0d8','0090c7','5a227f','502f84','685399','2c1a6b','2d267b','2b2b81','233482','223686','1e3987','004893','004c95','0062a6','4c1676','49217d','3f207b','201256','2a226e','272d79','222e70','292a71','153673','034282','003a6b','005893','47146c','44166d','3c1970','180c41','241962','1c1f5e','15275b','1c1c55','1f2b6a','0e366c','00264a','003457','360a4e','3a0f54','22073b','100026','150c45','13133f','021430','0d0b30','071132','031534','000a1b','001b2e','53cae7','91d9e0','8ed8e0','64cdd7','5dcbd1','b6e4e2','8cd7d0','6ecfc8','72d0c4','6ccebf','aee1d4','86d4c2','00b7e0','13c3df','35c5da','00bdcc','00bcc7','7ed3d3','4fc8c1','50c8be','4cc7ba','12c0af','9bdbcd','65cbb7','00a2d6','00acdf','00adce','00aacb','00adbe','16c1c3','00afa2','00b5ad','00b6a4','00ac92','47c6b3','00af8c','0070b1','0081bf','0090c8','00a1c5','00a2b8','00a5ac','009180','00a89c','00aa96','00a683','00a885','00a46f','005a8c','006996','0077a4','0089a4','008396','009499','007c6e','009689','00a38e','008d73','00a27f','007b5b','003853','004b63','005673','006a7d','006975','007375','00665b','00574f','008171','006955','00876d','00654c','001d2b','003140','002b38','003a43','004c54','005b5d','004742','00423c','00423a','003129','00604f','004c3d','86d4bd','9ddabe','9adabe','8bd49c','bfe5ac','d1ebad','e3ef8b','eef48a','f7f897','fef981','d0cbbf','d2c7bd','52c7a7','7bd0b0','8fd6b8','7ed097','aadd9c','c6e6a1','d4e966','e3ee64','f8f670','fef75d','b3afa3','b3a59e','00b790','49c59f','70cdaa','31be67','90d485','b1de89','c0e042','d7ea5d','ecf150','f8f300','a49d94','978983','00aa75','00a55b','00aa58','00b548','39be48','77cb47','b2db3f','bfe051','e1ec30','f2f100','847d74','7c6e6c','007f5b','008850','00a74e','00a447','20b445','62c646','9cb733','b0cf26','c4ca11','bcaf00','696159','675855','006047','00623c','007a42','00893c','339034','579934','7b9020','899a19','aaae0a','8a820f','504942','483b3c','003527','003a29','004d34','007033','335c2a','3c571e','5f6520','6b7318','8c8e12','564d13','141110','1b1618','c7c9ba','d4d5ce','d9dedc','d5c5c0','b2c7c1','eeeae5','9d928a','ecebe6','a0a7aa','1f1d13','35301f','443616','a4a99d','b0b4b1','c3cacb','bfacaf','9fb4b0','dcd7cf','8c827a','dedfdc','8a8f91','02100c','36321c','6f5d2a','8e9187','999d9b','9da7aa','a49197','839997','cbc6be','7e736d','caccc9','797d7e','1e1712','3b3a1e','8a7b42','73796f','818684','6f7d82','6e585f','5d7475','b3ada4','736862','b8bebe','616467','2e1d22','8d8d66','b2a46c','5d655d','5d6263','4b5a63','322529','36474a','a8a29c','655954','a8afaf','4d5257','000410','aeb189','cabf8a','444a42','484d50','222f38','261c1e','2a3436', false,'564b46',false,'3a3f46','202122','c4c7a3','dad2a1','000407','00050d','000914','160d10','1f2524',false,false,false,false,false,'dbdbba','ece4b9','897414','5a3a1a','865136','974119','6e3830','471e19','97101a','681829','542327','773c48','571029','730068','b19212','764a20','ac7259','bb4b16','8b5b51','5f261f','ec000e','7d1d31','63292b','9a5865','741a3b','83017d','ead977','b89460','c1876f','f6946c','ab7e72','a8715e','f68374','ec7790','ce7b88','b97783','e58aa8','ce76ab','eee284','d0b582','d8a88d','fbbe9e','c79e91','d2a794','f99e8e','f895ab','f0a0aa','dda2a5','f1a5bc','e09abe','f3ee9b','dec798','eac5aa','fdc6a3','d7b4a2','e4c2ad','fbbaa8','fbb3c1','f9bdc1','ebbaba','f8b4c5','efb3cc','f8f6b2','eedfb4','f2d1b7','fdd1b1','e6cab8','ecceb8','fdcab7','fbc2cb','fbd0d1','f4cecd','fbc2cd','f6c3d5','38112f','3e1d3b','331c2e','45174f','11032a','0e1321','001727','000916','001c23','00191f','001e1c','002e24','5e2952','4b184e','54304a','5f127b','2f2755','0a1c38','002743','275c71','00262f','005b64','24514c','00513f','7f4f75','61296e','825a73','600d7a','464774','172e5a','00375d','4b768a','00323c','338a90','4f726e','006249','9d7091','a67aaf','ae899b','9c6ca7','767a9e','8297b8','3e9ac5','6c93a5','3e99ac','6aaeb2','7a9d98','5aa88f','c8a3b9','be98bf','ccaeba','b995be','a9adc5','96acc6','89c2df','9dbbc6','74b7c7','81c1c4','9dbbb5','7ec0ab','e4c9d3','cfb0cd','dec3cb','d7b0cc','bfbfd0','baccdc','acd7e5','b4cfd7','8dc6d2','a5d3d3','b7cfca','9cd1bd','ebd0d8','dcc5d9','eedbdc','dfc4d8','d8dbe2','cedee6','bde1ed','c5dde1','b7dce3','c0e2de','cadfdb','b6ddc8','012320','002c28','022019','002e28','294221','273822','243112','484c14','323211','fdfbb2','fdfcbe','f0efb7','306359','00544c','426254','005e54','356c35','465938','53652f','77841b','6d6f34','fdfaa6','fbf8a8','e6e4a5','57847b','006e66','5b7b6c','008a7c','51944c','586b45','72844c','a3bd20','98975c','faf999','f6f395','ddda93','75a49b','5ac3b5','89a393','60cbbe','99cf8f','7e9269','9aab71','d2e763','a3a66c','fbf56f','ede773','cac679','92b9ae','80d1c5','a5bcad','95d9ca','add89d','a2b28c','beca98','e3ef86','c4c893','f7ed47','d9d450','a9a653','b2d0c4','9ddcd2','b7caba','a7dfd5','b9dea7','b4c2a2','d1daad','e9f293','d7d8a7','eee000','c9bf00','8f8739','cce4d8','caece4','cad9c8','bce6de','d0ebb9','d0d8b8','e1e6c2','f1f6a0','e4e4b7','deca00','b4aa00','746d1c','d5eade','c1e9eb','a2dee2','d4eaf0','dfecf1','dfeff5','f1e9ef','fbdae2','f7d8de','f5cad5','fcd9d8','ffdbdc','add5c9','8bd7de','87d6e2','bcdde8','c5dae5','b9d8e8','e8e0e5','f6c1d3','f5cfdb','f3bbcf','f5c4c6','fcc4cc','88c0b4','60ccd9','00bfd7','81b3ce','8ab1d2','8cbbdc','c2bbd4','ed99bd','f1c3d6','e7a1bf','e8a4b0','f9a2b5','63a599','00b9ce','00add3','6193b9','528ebc','5a90c2','9287b1','e27eaf','da8eb4','d07ea5','d48594','f77d99','318072','00a0bc','009ecc','2b7fac','004d85','0062a5','6a5c8f','d14e98','be6899','b85a8d','b65f75','ec4c7a','005246','007997','0083b1','004d7e','07254b','08418a','4c3e75','b8006f','973972','8b2764','822e45','ca1950','00211b','006585','0071a4','022245','061433','21276c','261245','9a004e','6f0545','550032','7a243b','a50035','ffe5e6','fed3a9','fed9b6','f6d3b3','fff0c0','fab200','f9b9a4','ffdbde','f6c5d3','f9e0e6','e0e1eb','bacadf','fdcdd2','fcc192','f8c9a0','eec2a0','ffeda4','f9ac00','f25b4c','f44f85','f2afc5','d2adca','afb6d3','809ec8','faacba','fbb684','f6b085','e1ae89','ffdf88','faa777','ef3a2f','ef0078','e081a3','c98bb7','9299c2','6d8dbf','f77f96','f88e34','dc8656','c28662','ffe131','f99855','d63553','c80059','c34d7e','b085b5','7e7eb4','659ac8','f3537a','f67a24','be6935','a66a44','ffdc00','df783b','a63550','b70046','b21e61','9c6ea5','4c3a75','4b8fb2','ef205d','ed6c00','914311','61310f','ffce00','ed6913','980038','9c002a','97004c','884e96','322440','18599f','eb0048','ea6100','743411','4b240c','e09e56','c35b10','4a001c','5e1131','7c0041','6a2080','1f0a1f','506aaa','c9ecf0','90d8d1','83d4cb','9edbc0','e2f1d4','c9e198','fdf7cd','fde9c0','f9bda6','fcc3b0','e5dfc6','e3dec8','55b9cd','00bdad','1ec1ba','34c18c','c5e7ae','b9d09b','f6eabf','fedca8','e7a58e','d5a38f','cfc1ad','0098b3','00abae','00ac9c','00b17d','81cf83','8fb591','efe4bf','f4d094','d3906f','c06354','bcac9b','9b957d','008ec0','00a7b0','00767d','00ac62','5cc663','7b9a3b','e7d39e','ebb77a','913c1a','ac5451','a59585','9faa9b','0084bd','007194','187777','00a759','55ba66','4e7f28','a59a6d','d99858','6f2a0f','a44340','746454','849184','00527f','005477','004146','005432','529950','605d46','857158','b86e1f','5a3c35','955a44','55473b','7c8681','00223e','005462','003e4c','004d39','557b39','344525','72523b','a35b0f','4c3a33','7c2a10','261c14','494e52','dce8ec','a4c2c2','9ba8ad','778c92','3d5460','233845','000c1c']

$(function(){
  for (var color_value in colors) {
    // Shortcut
    var object = colors[color_value];

    // If the object is `false` only an spacer will be loaded
    object? 
      $placeholder.append(markup_color(object)):
      $placeholder.append('<div class="black-space" />');
  }
  if (localStorage['palette'])
    var db_palette = localStorage['palette'],
        chosen_colors = JSON.parse(db_palette)
    for (var color in chosen_colors) {
      var object = chosen_colors[color];
      $('#chosen_colors').append(markup_color(object))
    }
});
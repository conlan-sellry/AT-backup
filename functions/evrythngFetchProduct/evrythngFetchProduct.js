/* eslint-disable */
const evrythng = require('evrythng');

exports.handler = async function(event, context){

  console.log('process.env.EVRYTHNG_API_KEY:');
  console.log(process.env.EVRYTHNG_API_KEY);

  const thngId = event.queryStringParameters.id;

  console.log('thngId:');
  console.log(thngId);

    //let operatorApiKey = process.env.EVRYTHNG_API_KEY || 'v9chldkQhFhQdHMJh4IEUHQ3ERei9hpUWGSlOinFkYxYmcFxk53M35yKP0sNlQm6xQO8W8oMjkNdXv9i';
    let operatorApiKey = process.env.EVRYTHNG_API_KEY || 'P3jbD6wNKuW8HoExKC7jWKg9wfKX6w39gBQiDUkccrdJUFg9yPkea7zFgM7Ymv2PdnVhhbFBbpfJQumi';
    //let operatorApiKey = 'cs71XF089ZTKihCIUAx3xUNmPyLVKvH9mjFR22YkqDZw0houeDw3uxBGVoR81hC4Znk0RZ8KMCgQ5glh'; //dev

  const operator = new evrythng.Operator(operatorApiKey);

  //with prd - UrMmgb4eCBwBB5eee8eygfns
  //fake tid - UqKWAsTpdxCA3KwaaGmTxAhp

  /*
  dev
  UrMmgb4eCBwBB5eee8eygfns
  UrMGDbHeR7pQVKw4KHS6Mq3s
  U7qGXSnd9QybyQxfbc85Btcg
  UrqmgbndQYFYCdSneGTs2Bnn

  live
  UrMtagr2QtcxctxfSyMkefVe
  UNM9aDs5Q9cbyQxWxy62Ck7k
  UN6taDN2QEFYCdS4BGcWwnnp
  U7qtRXrkK5krUadYxh8yaqsc
  */

  try {
    const thngResponse = await operator.thng(thngId).read();

    //console.log('thngResponse:');
    //console.log(thngResponse);

    if (!thngResponse) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: thngResponse.status, body: thngResponse.statusText }
    }
    const data = await thngResponse.json();

    //console.log('data:');
    //console.log(data);

    const productResponse = await operator.product(data.product).read();

    //console.log('productResponse:');
    //console.log(productResponse);

    if (productResponse.length > 0) { //@TODO - this returns an array of products if product read() doesnt find product with thngId
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: productResponse.status, body: productResponse.statusText }
    }

    //console.log('returning true');

    return {
      statusCode: 200,
      body: JSON.stringify(productResponse)
    }
  } catch (err) {

    console.log('error'); // output to netlify function log
    console.log(err); // output to netlify function log

    return {
      statusCode: 500,
      body: JSON.stringify({ msg2: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
};

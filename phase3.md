## Phase 3 - Listening to BIBs

1. Put the response out to the console.
In your postWebhook function, add
```javascript
    const action = req.body.action.toLowerCase();
    switch (action) {
        case "bib":
            console.log("received a bib action");
            console.log(req.body);
            break;
        default:
            console.log(`No handler for type ${action}`);
            break;
    }
```

2. Build and restart your app.
`npm run build` `npm run start`

3. If you're running locally, we'll need to temporarily expose your app to the greater internet (This is really not secure and only recommended for brief testing. Install localtunnel with `npm install -g localtunnel` then run `lt --port 3000`. Note that your app must be running to do this `npm run start`. An example might be something like https://red-rattlesnake-79.localtunnel.me/alma_webhook). If you're running on a hosted VM like in AWS, you just need your web accessible address (and port). If you have a publically accessible IP then you can probably access it that way as well. Do note that it must be a secure HTTPS connection.

4. Update your Alma Configuration. Go to your Sandbox URL and login.
    1. Go to Alma Configuration (Tool Icon in upper right hand corner).
    2. Select the General Tab on the left.
    3. Then click Integration Profiles (under External Systems).
    4. Most likely if you're here, you won't have an Integration Profile set up for webhooks, so we'll add one.
    5. Click add Integration Profile.
    6. Enter a code (no spaces or special characters).
    7. Enter a name (human readable).
    8. Choose "Webhooks" for the integration type.
    9. Write a description.
    10. Click Next.
    11. Add your webhook listener URL.
    12. Enter your secret. This must match the secret you put in your config.ts file. It should probably be something more secure than what I'm using in this demo.
    13. Click the Activate button. If it worked, you should see a success message.
    14. Select your message type. For this demo, we'll use JSON, but feel free to use XML if you prefer it.
    15. Select the event types that you want to subscribe to. For now, let's just choose BIB Records.
    16. Click save.

5. Then edit a BIB record in Alma.

6. Check your console. You might see someething like:
```
  { id: '6483925840173882651',
  action: 'BIB',
  institution: { value: '01ASU_INST', desc: 'Arizona State University' },
  time: '2019-02-13T23:26:00.633Z',
  event: { value: 'BIB_UPDATED', desc: 'BIB record updated' },
  bib:
   { mms_id: '991022382849703841',
     record_format: 'marc21',
     linked_record_id: { value: '', type: null },
     title: 'Frogs /',
     author: 'Bishop, Nic,',
     issn: null,
     isbn: '9780439877558 (hardcover) :',
     network_number: [ '(OCoLC)85766248', '(AzTeS)b52787461-01asu_inst' ],
     place_of_publication: 'New York, NY :',
     date_of_publication: '2008.',
     publisher_const: 'Scholastic Nonfiction',
     holdings:
      { value: '',
        link: '/almaws/v1/bibs/991022382849703841/holdings' },
     created_by: 'import',
     created_date: '2017-07-04Z',
     last_modified_by: '1213994287',
     last_modified_date: '2019-02-13Z',
     suppress_from_publishing: 'false',
     originating_system: 'ILS',
     originating_system_id: 'b52787461-01asu_inst',
     cataloging_level: { value: '50', desc: 'Cataloging Desk' },
     anies:
      [ '<?xml version="1.0" encoding="UTF-16"?>\n<record><leader>01001cam a2200265 a 4500</leader><controlfield tag="001">991022382849703841</controlfield><controlfield tag="005">20190213162556.0</controlfield><controlfield tag="008">070301s2008    nyua   b      001 0 eng  </controlfield><datafield ind1=" " ind2=" " tag="010"><subfield code="a">2007008699</subfield></datafield><datafield ind1=" " ind2=" " tag="020"><subfield code="a">0439877555 (hardcover) :</subfield></datafield><datafield ind1=" " ind2=" " tag="020"><subfield code="a">9780439877558 (hardcover) :</subfield></datafield><datafield ind1=" " ind2=" " tag="035"><subfield code="a">(AzTeS)b52787461-01asu_inst</subfield></datafield><datafield ind1=" " ind2=" " tag="035"><subfield code="a">(OCoLC)85766248</subfield></datafield><datafield ind1=" " ind2=" " tag="040"><subfield code="a">DLC</subfield><subfield code="c">DLC</subfield><subfield code="d">IG#</subfield><subfield code="d">BTCTA</subfield><subfield code="d">BAKER</subfield><subfield code="d">TEF</subfield><subfield code="d">OCLCQ</subfield><subfield code="d">EHH</subfield><subfield code="d">VP@</subfield><subfield code="d">YDXCP</subfield><subfield code="d">AZS</subfield></datafield><datafield ind1=" " ind2=" " tag="049"><subfield code="a">AZSA</subfield></datafield><datafield ind1="1" ind2=" " tag="100"><subfield code="a">Bishop, Nic,</subfield><subfield code="d">1955-</subfield></datafield><datafield ind1="1" ind2="0" tag="245"><subfield code="a">Frogs /</subfield><subfield code="c">Nic Bishop</subfield></datafield><datafield ind1=" " ind2=" " tag="260"><subfield code="a">New York, NY :</subfield><subfield code="b">Scholastic Nonfiction,</subfield><subfield code="c">2008.</subfield></datafield><datafield ind1=" " ind2=" " tag="300"><subfield code="a">48 p. :</subfield><subfield code="b">col. ill. ;</subfield><subfield code="c">29 cm.</subfield></datafield><datafield ind1=" " ind2=" " tag="520"><subfield code="a">Nic Bishop\'s photographs show all different kinds of frogs, big ones, very tiny ones, frogs with beautiful colors of skin, and one frog you can see inside of.</subfield></datafield><datafield ind1=" " ind2=" " tag="500"><subfield code="a">Includes index.</subfield></datafield><datafield ind1=" " ind2=" " tag="586"><subfield code="a">Boston Globe/Horn Book Honor Book, 2008.</subfield></datafield><datafield ind1=" " ind2="0" tag="650"><subfield code="a">Frogs</subfield><subfield code="v">Juvenile literature.</subfield></datafield><datafield ind1=" " ind2=" " tag="907"><subfield code="a">.b52787461</subfield><subfield code="b">multi</subfield><subfield code="c">080728</subfield><subfield code="d">m</subfield><subfield code="e">a</subfield><subfield code="f">-</subfield><subfield code="g">0</subfield></datafield><datafield ind1=" " ind2=" " tag="910"><subfield code="a">Send to Backstage</subfield></datafield></record>' ],
     requests: null,
     link: null },
  holding: null,
  item: null,
  portfolio: null,
  representation: null }
```

7. Write whatever functionality you want!

rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {

    function signedIn() { return request.auth != null; }
    function isFounder() {
      return signedIn()
        && request.auth.token.email == 'nv24142@ncst.edu.bh'
        && request.auth.token.email_verified == true;
    }

    // الحساب الكامل (العملات، المشتريات، الأصدقاء) — صاحبه فقط
    match /users/{uid} {
      allow read, write: if signedIn() && request.auth.uid == uid;
    }

    // البطاقة العامة (الاسم، الشخصية، المستوى، رقم اللاعب، متصل/غير متصل)
    match /profiles/{uid} {
      allow read: if signedIn();
      allow write: if signedIn() && request.auth.uid == uid;

      // صندوق الرسائل: طلبات صداقة، دعوات، هدايا المؤسس، وإهداءات اللاعبين
      match /inbox/{msg} {
        allow read, delete: if signedIn() && request.auth.uid == uid;
        allow create: if signedIn()
          && request.resource.data.from == request.auth.uid
          && (request.resource.data.t in ['req', 'acc', 'inv', 'del']
              || (request.resource.data.t == 'gift' && isFounder())
              || (request.resource.data.t == 'pgift'
                  && request.resource.data.coins is int && request.resource.data.coins >= 0 && request.resource.data.coins <= 1000
                  && request.resource.data.pearls is int && request.resource.data.pearls >= 0 && request.resource.data.pearls <= 10));
      }
    }

    // الإعلانات: يقرأها الجميع، ويكتبها المؤسس فقط
    match /meta/{doc} {
      allow read: if true;
      allow write: if isFounder();
    }
    match /rooms/{code} {
      allow read: if signedIn();
      allow create: if signedIn() && request.resource.data.host == request.auth.uid;
      allow update: if signedIn() && resource.data.host == request.auth.uid && request.resource.data.host == request.auth.uid;
      allow delete: if signedIn() && resource.data.host == request.auth.uid;
    }
  }
}

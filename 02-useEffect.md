```Effect Hooks``` cho phép bạn thực hiện các "hiệu ứng" (side effect) trong các ```function component/statless component```

Xem thử đoạn code dưới đây:

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Đoạn code này có thể thay đổi title của trang web mỗi khi chúng ta bấm nút, đó là một tác dụng của ```useEffect```

Fetching data, setting subscription hay thay đổi DOM một cách thủ công đều được coi là ```side effect```.

> NOTE: Note nhẹ để dễ nhớ, nếu như chúng ta đã quen với vòng đời của một component trong React class, thì chúng ta hoàn toàn có thể coi ```useEffect``` như là ```compoentDidMount```, ```componentDidUpdate``` và ```componentWillUnmount``` kết hợp lại với nhau.

Có 2 loại phổ biến của side effect trong React đó chính là loại cần cleanup và loại không cần cleanup. Chúng ta sẽ xem xét từng loại.

<h2>1. Effect without cleanup</h2>

Trong một vài trường hợp, bạn muốn chạy một vài đoạn code nhỏ sau khi React update DOM. Tỷ dụ như là network request, thay đổi DOM, logging, ... những công việc đó là ví dụ cho việc một effect không cần cleanup vì chúng ta chỉ chạy nó thôi, sau đó quên nó luôn. Cùng xem ```class``` và ```hooks``` giải quyết việc này như thế nào nhé.

<h3>1.1 Sử dụng classes</h3>

Trong các class components của React, hàm ```render``` không được coi là một ```side effect``` vì nó diễn ra quá sớm - chúng ta thường muốn thực hiện các effect sau khi React update DOM.

Đó là lý do tại sao trong các classes, chúng ta thường đặt các side effect ở trong ```componentDidMount``` và ```componentDidUpdate```

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```
Ố ồ, chuyện gì đang diễn ra vậy? Chúng ta đang lặp lại code của chính mình qua 2 vòng đời của React component lận.

Đó là bởi vì trong rất nhiều trường hợp chúng ta muốn thực hiện một side effect giống hệt nhau ngoại trừ việc component được sinh ra là khác nhau, hoặc nó được update. Và trên lý thuyết, chúng ta muốn hành động side effect đó diễn ra mỗi lần render, nhưng thật không may rằng React lại không có phương thức hỗ trợ chuyện đó, vậy nên, ta phải viết 2 lần.

<h3>1.2 Sử dụng useEffect</h3>

```javascript
import React, { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
```

Well well, lại gì nữa đây? Viết 1 phát mà nó ăn được ở cả 2 giai đoạn của vòng đời như code bên trên á? Lại "dân hỏi bộ trưởng trả lời" cho nó hiểu hơn nào.

<h4>1.2.1 What does useEffect do?</h4>

Cái ```useEffect``` này nó làm gì vậy?

> Khi sử dụng ```useEffect```, chúng ta đã nói cho React biết rằng component của chúng ta <em>làm một chuyện gì đó</em> sau mỗi lần render. React sẽ nhớ cái function mà chúng ta viết bên trong ```useEffect``` (cái function đó gọi là <b>hiệu ứng - effect</b>), và sẽ gọi function đó sau khi DOM được update. Trong cái effect này, như ví dụ đang code, chúng ta đang set lại giá trị của title, ngoài ra, chúng ta còn có thể thực hiện fetch dữ liệu thông qua các API

<h4>1.2.2 Why is useEffect called inside a component?</h4>

Tại sao ```useEffect``` lại được gọi bên trong một component?

> Ô chẳng phải là để truy cập vào ```state``` mà các ông khai báo và sử dụng sao?

<h4>1.2.3 Does useEffect run after every render?</h4>

Có phải ```useEffect``` chạy trước ```render```?

> Chuẩn nhưng vẫn phải chỉnh. ```useEffect``` chạy trước lần render đầu tiên và sau các lần update DOM tiếp theo (chúng ta có thể custom được việc này).


<h4>1.2.4 NOTE nhẹ</h4>

Không giống như ```componentDidMount``` hay ```componentDidUpdate```, các effect được thực thi đều đặn ở trong ```useEffect``` không block trình duyệt trong khi update (block ở đây được hiểu là trong quá trình update component thì ta click chuột hay làm gì cũng không được hết). Điều này sẽ khiến web của ta mượt mà và tốt hơn. Đa phần các effect không cần thiết phải có tính đồng bộ, vì thế nên nó là bất đồng bộ. Trong một số trường hợp hi hữu (như là tính toán lại layout) thì chúng ta sẽ xài ```useLayoutEffect``` thay vì ```useEffect``` thông thường.


<h2>2. Effects with Cleanup</h2>

Trong một kịch bản rằng chúng ta muốn set up a subscription tới một vài dữ liệu từ nguồn bên ngoài chẳng hạn, chúng ta cần thực hiện cleanup để tránh memory leak

<h3>2.1 Sử dụng classes</h3>

Thông thường, trong react class, chúng ta thường setup một subscription ở ```componentDidMount``` và xóa chúng đi ở ```componentWilMount```. Ví dụ chúng ta thực hiện gọi API ```ChatAPI``` để biết được rằng trong list bạn của chúng ta, thằng nào đang onl.

```javascript
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```
<h3>2.2 Sử dụng hooks</h3>

Vi diệu hơn đấy nhé:

```javascript
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
Lại là các câu hỏi, "giúp em trả lời các câu hỏi"

<h4>2.2.1 Why did we return a function from our effect?</h4>

Tại sao trong ```useEffect``` lại trả về một function?

> Đây là một cơ chế cleanup của effect. Mọi effect đều có thể trả về một function để thực hiện hành động cleanup sau khi chạy function chính muốn làm. Và điều này vẫn giữ nguyên logic thêm vào và bớt ra những subscription như cách mà class vẫn làm.

<h4>2.2.2When exactly does React clean up an effect?</h4>

Vậy thì chính xác là khi nào React chạy clean up của một effect?

> React thực hiện cleanup khi component unmount. Nhưng, như chúng ta đã biết, các effect chạy mỗi lần render, vậy nên React cũng thực hiện clean up lần render trước đó, trước khi chạy effect của lần render tiếp theo.

<h2>3. Một số tips khi sử dụng useEffect</h2>

<h3>3.1 Sử dụng nhiều useEffect cho từng mục đích riêng biệt</h3>

Trong một vài (hình như là rất nhiều) trường hợp, bài toán của chúng ta bị chia thành các phần nhỏ hơn chẳng liên quan gì đến nhau, bởi vì là do vòng đời của một React component trong react class cũ. Nhiều khi việc này thật vô nghĩa và lặp lại:

```javascript
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

Việc thay đổi title được viết ở 2 chỗ, việc cleanup cũng được viết ở một chỗ khác, mặc dù, chúng đều thực hiện chung một công việc nào đó. Và hooks đã giải quyết cho chúng ta điều này, code ngắn hơn, dễ dàng viết và tái sử dụng hơn.

```javascript
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```
<h3>3.2 Tại sao các effect lại chạy trong mỗi lần update</h3>

Nếu bạn từng sử dụng class react, bạn sẽ tự hỏi rằng tại sao các cleanup effect lại được chạy sau mỗi lần re-render, và không chỉ một lần trong lúc unmount. Hãy cùng xem ví dụ dưới đây để hiểu rõ về vấn đề này nhé.

Component ```FriendStatus``` ở phần trước làm nhiệm vụ hiển thị trạng thái online của friend trên trang mạng xã hội. Class của chúng ta thực hiện đọc ```friend.id``` từ ```this.props```, theo dõi (subscribe) tên friend này sau khi component mount và bỏ theo dõi (unsubscribe) nó khi unmount:

```javascript
componentDidMount() {
  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}

componentWillUnmount() {
  ChatAPI.unsubscribeFromFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}
```
Nhưng điều gì sẽ xảy ra khi mà ```props``` thay đổi trong khi component đang được hiển thị trên màn hình? Component của chúng ta sẽ tiếp tục hiển thị trạng thái onl của ông bạn này. Đây chính là bug chứ còn gì nữa. Điều này cũng dẫn tới memory leak hoặc crash app khi unmount nếu như việc bỏ theo dõi gọi nhầm friendId.

Trong trường hợp này, đối với class component, chúng ta cần thêm hành động xử lý khi ```componentDidUpdate```

```javascript
componentDidMount() {
  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}

componentDidUpdate(prevProps) {
  // Unsubscribe from the previous friend.id
  ChatAPI.unsubscribeFromFriendStatus(
    prevProps.friend.id,
    this.handleStatusChange
  );
  // Subscribe to the next friend.id
  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}

componentWillUnmount() {
  ChatAPI.unsubscribeFromFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}
```
Với hooks của chúng ta thì vẫn vậy, không cần thêm gì cả, nó không gây bug:

```javascript
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```
Chúng ta không cần code thêm để giải quyết vấn đề giống như ```componentDidUpdate``` ở bên class, vì hooks mặc định giải quyết nó rồi. Nó sẽ thực hiện clean up các effect trước đó trước khi chạy các effect tiếp theo. Để cho dễ nhìn thì chúng ta có thể viết ra trình tự chạy của nó như này:

```javascript
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Run first effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Run next effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Run next effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect
```
<h3>3.3 Tối ưu hóa hiệu năng bằng cách skip effect đúng lúc</h3>

Trong nhiều trường hợp, cleanup hoặc chạy các effect mới sau khi render là một việc ảnh hưởng tới hiệu năng. Ở các class component, chúng ta có thể giải quyết chúng bằng các so sánh ```state``` với ```state trước đó```, hoặc so sánh ```props``` với ```props trước đó```:

```javascript
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

Thế còn bên hooks thì sao? Chúng ta có thể nói cho React biết rằng đừng chạy effect khi mà một hoặc một vài giá trị state không thay đổi sau khi re-render. Vì thế nên, cách làm sẽ như này:

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```
Đoạn code này nghĩa là sao? Nghĩa là khi re-render xong, mà kết quả của thằng ```count``` (```count``` đang là một giá trị của state nhé) nó không thay đổi so với trước khi re-render, thì cái effect trong ```useEffect``` nó sẽ không chạy. Ngược lại, effect trong ```useEffect``` chỉ chạy khi thằng ```count``` có sự thay đổi sau khi re-render. --> So awesome.

Nhắc nhẹ là tham số thứ hai kia là một mảng nên là ta có thể truyền vào nhiều giá trị mà ta muốn skip useEffect nhé, giả dụ:

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count, props.name]);
```
hoặc là khi không muốn truyền gì, lúc nào cũng muốn chạy effect sau khi re-render thì không viết nữa:

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
});
```

Thế còn để mảng rỗng có giống như không viết mảng kia không?
> Khác nhé. Cẩn thận.

Khi chúng ta truyền tham số thứ 2 của ```useEffect``` là một mảng rỗng, như này:

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, []);
```
Thì có nghĩa chúng ta đang nói với React rằng tôi chỉ muốn effect và clean up (nếu có) của tôi <em><b>chạy 1 lần duy nhất</b></em>, chỉ 1 lần duy nhất thôi, không chạy lại trong các lần re-render sau. Việc này làm cho ```useEffect``` của chúng ta trong trường hợp này giống với ```componentDidMount``` và ```componentWilUnmount```, việc sử dụng ```[]``` làm đối số thứ hai thường là điều tốt để tránh việc effect chạy lặp đi lặp lại quá nhiều lần.


Cái này cũng áp dụng được cho clean up, nên là cứ thoải con gà mái đê:

```javascript
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Only re-subscribe if props.friend.id changes
```

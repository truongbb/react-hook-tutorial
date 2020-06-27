Chúng ta có đề cập tới các luật sử dụng hooks [ở phần giới thiệu](./00-introduction.md#2-khi-nào-nên-sử-dụng-hooks), điểm qua lại một chút:
- RULE 1: Only Call Hooks at the Top Level
- RULE 2: Only Call Hooks from React Functions

Và ở phần này, ta tập trung đi giải thích tại sao ```Only Call Hooks at the Top Level```.

Như chúng ta đã biết, chúng ta hoàn toàn có thể sử dụng nhiều ```useState``` hoặc ```useEffect``` ở trong một component:

```javascript
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState('Mary');

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState('Poppins');

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```
Vậy thì làm thế nào React biết được state nào tương ứng với cái ```useState``` nào? Câu trả lời là <b>React dựa vào thứ tự mà mỗi hooks được gọi</b>. Ví dụ trên hoạt động được do thứ tự call hooks là giống nhau trong mỗi lần render:

```javascript
// ------------
// First render
// ------------
useState('Mary')           // 1. Initialize the name state variable with 'Mary'
useEffect(persistForm)     // 2. Add an effect for persisting the form
useState('Poppins')        // 3. Initialize the surname state variable with 'Poppins'
useEffect(updateTitle)     // 4. Add an effect for updating the title

// -------------
// Second render
// -------------
useState('Mary')           // 1. Read the name state variable (argument is ignored)
useEffect(persistForm)     // 2. Replace the effect for persisting the form
useState('Poppins')        // 3. Read the surname state variable (argument is ignored)
useEffect(updateTitle)     // 4. Replace the effect for updating the title

// ...
```
Miễn là thứ tự gọi hooks giống nhau trong mọi lần render, React có thể két hợp một vài state cục bộ lại với nhau. Nhưng chuyện gì sẽ xảy ra nếu như chúng ta thực hiện gọi ```useEffect``` bên trong một khối lệnh điều kiện nào đó:

```javascript
 // 🔴 We're breaking the first rule by using a Hook in a condition
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```
OK, câu chuyện bắt đầu từ đây. Giả như lần đầu tiên render, điều kiện của ```if``` đúng, tức là ```name``` đang khác rỗng, vậy thì effect sẽ được chạy. Nhưng nếu như ở một lần render nào đó, mà ```name``` nó rỗng thì sao nhỉ? Well well, that's not good. Điều đó làm cho việc gọi hooks ở các lần render là khác nhau:

```javascript
useState('Mary')           // 1. Read the name state variable (argument is ignored)
// useEffect(persistForm)  // 🔴 This Hook was skipped!
useState('Poppins')        // 🔴 2 (but was 3). Fail to read the surname state variable
useEffect(updateTitle)     // 🔴 3 (but was 4). Fail to replace the effect
```

React sẽ không biết được lần gọi ```useState``` thứ hai. Nó đang kì vọng rằng lần gọi hooks thứ hai sẽ tương ứng với ```persistForm``` effect, như là điều đã xảy ra trong lần render trước đó, nhưng không, giờ nó đã không được gọi, điều này dẫn tới bugs.

Vậy nên, đó là lí do tại sao chỉ nên gọi hooks ngay đầu component của chúng ta. Thay vì đặt điều kiện để gọi hooks thì chúng ta hãy đưa điều kiện vào trong hooks để check nhé:

```javascript
useEffect(function persistForm() {
  // 👍 We're not breaking the first rule anymore
  if (name !== '') {
    localStorage.setItem('formData', name);
  }
  });
```
--> Better

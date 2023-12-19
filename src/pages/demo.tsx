const Demo = () => {
  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    console.log({ev})
    var data = ev.dataTransfer.getData("text");
    console.log(data)
    ev.target.appendChild(document.getElementById(data));
  }
  return (
    <div>
        <button type="submit" form="div1">review</button>
      <form
        id="div1"
        onDrop={(e) => drop(e)}
        onDragOver={(e) => allowDrop(e)}
        className="h-32 w-48 bg-red-50"
        onSubmit={e=>{e.preventDefault();console.log(e.target.teacher.value)}}
      ></form>

      <input
        id="drag1"
        draggable="true"
        onDragStart={(e) => drag(e)}
        width="336"
        height="69"
        name="teacher"
      />
    </div>
  );
};

export default Demo;

if (!localStorage.token) {
  $('#login').show()
  $('#dash').hide()
  $("#signout").hide()
  $("#signIn").hide()
  $("#register").show()
} else {
  $("#signout").show()
  $("#signIn").hide()
  $("#register").hide()
  getProfile()
  $("#profile").append(`
<h5><strong> Hai,</strong></h5>
<h6><strong>${(localStorage.getItem('nama')) ? localStorage.getItem('nama') : 'stranger'}</strong></h6>
`)
  if (localStorage.getItem('profpic')) {
    $("#profpic").attr("src", localStorage.getItem('profpic'))
  }
  getAllTodo()
}

function getSignin() {
  $("#register").hide()
  $("#signIn").show()
}

function getRegister() {
  $("#register").show()
  $("#signIn").hide()
}

function getProfile() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/users/",
    headers: {
      "token": localStorage.getItem('token')
    }
  })
    .done(data => {
      localStorage.setItem('nama', data.data.username)
      localStorage.setItem('profpic', data.data.profpic)
    })
    .fail(err => {
      console.log(err);
    })
}

$("#sign-in-btn").submit(function () {
  console.log('masuk');
  event.preventDefault();
  let username = $('#username').val()
  let password = $('#password').val()
  $.post("http://localhost:3000/users/signin", {
    username,
    password
  })
    .done(function (data) {
      Swal.fire({ type: 'success', title: `Login Success`, showConfirmButton: false })
      localStorage.setItem('token', data.token)
      localStorage.setItem('nama', getProfile())
      setTimeout(function () {
        location.reload();
      }, 2000);
    })
    .fail(err => {
      Swal.fire({ type: 'error', title: `${err.responseJSON.err.message}` })
    })
})

$("#register-btn").click(function () {
  event.preventDefault();
  let username = $('#username1').val()
  let password = $('#password1').val()
  let email = $('#email1').val()
  $.post("http://localhost:3000/users/signup", {
    username,
    password,
    email
  })
    .done(function (data) {
      Swal.fire({ type: 'success', title: `Register Success`, showConfirmButton: false })
      setTimeout(function () {
        location.reload();
      }, 2000);
    })
    .fail(err => {
      console.log(err);
      Swal.fire({ type: 'error', title: `${err.responseJSON.err.message}` })
    })
})

function getFormCreate() {
  $(".form-todo").toggle()
  $(".get-todo").toggle()
}

function createTodo() {
  event.preventDefault()
  let title = $("#title").val()
  let description = $("#description").val()
  let dueDate = $("#due-date").val()
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/todos/",
    headers: {
      "token": localStorage.getItem('token')
    },
    data: {
      title,
      description,
      dueDate
    }
  })
    .done(data => {
      Swal.fire({ type: 'success', title: `Success create new Todo`, showConfirmButton: false })
      setTimeout(function () {
        location.reload();
      }, 2000);
    })
    .fail(err => {
      Swal.fire({ type: 'error', title: `${err.responseJSON.err.message}` })
    })
}

function getAllTodo() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/todos/",
    headers: {
      "token": localStorage.getItem('token')
    }
  })
    .done(({ data }) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].status) {
          $(".get-todo").append(`
          <div class="col s4 m4" id="todo-${data[i]._id}">
            <div class="card black darken-1" style="opacity : 0.8">
              <div class="card-content white-text">
                <span class="card-title">${data[i].title}</span>
                <p>${data[i].description}</p>
                <br>
                <p style="font-size : 10px"><i class="material-icons" style="color : green">done</i></p>
              </div>
              <div class="card-action">
                <a href="#"><i onclick="getDelete('${data[i]._id}')" class="material-icons" style="color : red">highlight_off</i></a>
                <a onclick="getUndone()" href="#"><i class="material-icons" style="color : green">thumb_up</i></a>
              </div>
            </div>
          </div>
          `)
        } else {
          $(".get-todo").append(`
          <div class="col s4 m4" id="todo-${data[i]._id}">
            <div class="card black darken-1" style="opacity : 0.8">
              <div class="card-content white-text">
                <span class="card-title">${data[i].title}</span>
                <p>${data[i].description}</p>
                <br>
                <p style="font-size : 10px">${moment(data[i].dueDate).endOf('day').fromNow()}</p>
              </div>
              <div class="card-action">
                <a href="#"><i onclick="getDelete('${data[i]._id}')" class="material-icons" style="color : red">highlight_off</i></a>
                <a onclick="getDone('${data[i]._id}')" href="#"><i class="material-icons" style="color : red">thumb_down</i></a>
              </div>
            </div>
          </div>
          `)
        }
      }
    })
    .fail(err => {
      Swal.fire({ type: 'error', title: `${err.responseJSON.err.message}` })
    })
}

function getDelete(param) {
  event.preventDefault()
  $.ajax({
    type: "DELETE",
    url: `http://localhost:3000/todos/${param}`,
    headers: {
      "token": localStorage.getItem('token')
    }
  })
    .done(data => {
      Swal.fire({ type: 'error', title: `Success delete Todo`, showConfirmButton: false })
      setTimeout(function () {
        location.reload();
      }, 2000);
    })
    .fail(err => {
      Swal.fire({ type: 'error', title: `${err.responseJSON.err.message}` })
    })
}

function getDone(param) {
  event.preventDefault()
  $.ajax({
    type: "PUT",
    url: `http://localhost:3000/todos/${param}`,
    headers: {
      "token": localStorage.getItem('token')
    },
    data: {
      status: true,
      dueDate: new Date()
    }
  })
    .done(data => {
      Swal.fire({ type: 'success', title: `Your Job is Done`, showConfirmButton: false })
      setTimeout(function () {
        location.reload();
      }, 2000);
    })
    .fail(err => {
      Swal.fire({ type: 'error', title: `${err.responseJSON.err.message}` })
    })
}

function getUndone() {
  Swal.fire({ type: 'error', title: `Your Job is already done, please create new Task and delete this one if you got any change`, showConfirmButton: false })
  setTimeout(function () {
    location.reload();
  }, 2000);
}

function getAll() {
  $(".get-todo").empty()
  getAllTodo()
}

function getUndoneTodo() {
  $(".get-todo").empty()
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/todos/undone",
    headers: {
      "token": localStorage.getItem('token')
    }
  })
    .done(({ data }) => {
      for (let i = 0; i < data.length; i++) {
        $(".get-todo").append(`
        <div class="col s4 m4" id="todo-${data[i]._id}">
          <div class="card black darken-1" style="opacity : 0.8">
            <div class="card-content white-text">
              <span class="card-title">${data[i].title}</span>
              <p>${data[i].description}</p>
              <br>
              <p style="font-size : 10px">${moment(data[i].dueDate).endOf('day').fromNow()}</p>
            </div>
            <div class="card-action">
              <a href="#"><i onclick="getDelete('${data[i]._id}')" class="material-icons" style="color : red">highlight_off</i></a>
              <a onclick="getDone('${data[i]._id}')" href="#"><i class="material-icons" style="color : red">thumb_down</i></a>
            </div>
          </div>
        </div>
        `)
      }
    })
    .fail(err => {
      Swal.fire({ type: 'error', title: `${err.responseJSON.err.message}` })
    })
}

$.get('http://localhost:3000/weathers')
  .done((data) => {
    $("#weather").append(`
  <img src="../image//SVG/${data.hourly.icon}.svg">
  <p>${data.timezone}</p>
  <p>${data.hourly.summary}</p>
  `)
  })
  .fail(err => {
    console.log(err)
  })
const loginUser = document.getElementById("login__user");
const loginPass = document.getElementById("login__pass");
const submit = document.getElementById("login__submit");
const item = document.getElementById("login__item");

const login = async () => {
  try {
    const api = await fetch("https://api.learnhub.thanayut.in.th/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginUser.value,
        password: loginPass.value,
      }),
    });

    if (!loginUser.value || !loginPass.value) {
      alert("กรุณากรอก Username และ Password");
      return;
    }

    const data = await api.json();

    if (!data.accessToken) {
      alert("กรุณากรอก Username และ Password ให้ถูกต้อง");
      return;
    }

    localStorage.setItem("accessToken", data.accessToken);

    const userApi = await fetch("https://api.learnhub.thanayut.in.th/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });
    const userlogin = await userApi.json();
    alert("เข้าสู่ระบบสำเร็จ");
    return userlogin;
  } catch (error) {
    alert("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
  }
};

const valueItem = async () => {
  try {
    const userData = await login();
    if (!userData) {
      return userData;
    }
    const loginHtml = `
      <section class="login__value">
        <p>id:${userData.id}</p>
        <p>username:${userData.username}</p>
        <p>name:${userData.name}</p>
        <p>registeredAt:${userData.registeredAt}</p>
      </section>
    `;
    item.innerHTML = loginHtml;
  } catch (error) {
    alert("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
  }
};

submit.addEventListener("click", async (event) => {
  event.preventDefault();
  await valueItem();
});

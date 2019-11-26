var Model = {};

/* AUXILIAR METHODS */
Model.signOut = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            sessionStorage.removeItem("user");
            resolve();
        })
    });
};
Model.loadBadge = function (userId) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (userId != null) {
                Model.getShoppingCartCounter(userId)
                    .then((itemCounter) => {
                        resolve(itemCounter);
                    });
            }
            else {
                resolve(0);
            }
        });
    });
};

/* PRODUCTS */
Model.getProducts = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/products',
            method: 'GET',
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            });
    });
};
Model.getProduct = function (pid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/products/' + pid,
            method: 'GET',
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            });
    });
}

/* USER */
Model.getUser = function (uid) {
    return new Promise(function (resolve, reject) {
        uid = sessionStorage.getItem("user");
        $.ajax({
            url: '/api/users/' + uid + '/profile',
            method: 'GET'
        })
            .done(function (user) {
                resolve(user);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}

//SIGNUP METHODS
Model.signup = function (userInfo) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/signup',
            method: 'POST',
            data: userInfo
        })
            .done(function (user) {
                resolve(user);
            })
            .fail(function (error) {
                console.log(error.responseJSON.error);
                reject(error.responseJSON.error);
            });
    });
}
Model.signin = function (emailf, passwordf) { //FUNCIONA
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/signin',
            method: 'POST',
            data: { email: emailf, password: passwordf }
        })
            .done(function (user) {
                sessionStorage.setItem("user", user._id); //Almacenamos el id en sessionStorage
                resolve();
            })
            .fail(function (err) {
                reject(err);
            });
    });
};

/* CART */
Model.removeAllCartItem = function (pid) {
    return new Promise(function (resolve, reject) {
        var userId = sessionStorage.getItem("user");
        $.ajax({
            url: '/api/users/' + userId + '/cart/items/' + pid,
            method: 'DELETE',
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            });
    });
};
Model.removeOneCartItem = function (pid) {
    return new Promise(function (resolve, reject) {
        var userId = sessionStorage.getItem("user");
        $.ajax({
            url: '/api/users/' + userId + '/cart/items/' + pid + '/decrease',
            method: 'DELETE',
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            });
    });
};

/* CART */
Model.getShoppingCart = function (uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/cart',
            method: 'GET'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.getShoppingCartItems = function (uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/cart/items',
            method: 'GET'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.buy = function (uid, pid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/cart/items/' + pid,
            method: 'POST'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}


/* ORDER */
Model.getUserOrders = function (uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/orders',
            method: 'GET'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.postUserOrder = function (uid, orderData) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/orders',
            method: 'POST',
            data: orderData
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.getUserOrderByNumber = function (uid, number) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/orders/' + number,
            method: 'GET'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.getUserOrderItems = function (uid, number) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/orders/' + number + '/items',
            method: 'GET'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.getShoppingCartCounter = function (uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/cart/counter',
            method: 'GET'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}

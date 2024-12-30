
        const btn = document.querySelector('button');
        const getName = document.querySelector('.take-name');

        btn.addEventListener('click', allMagic);

        function allMagic() {
            // Clear previous data
            const showImg = document.querySelector('.show-img');
            const followers = document.querySelector('.followers');
            showImg.innerHTML = ''; // Clear image container
            followers.innerText = ''; // Clear followers text

            let reqURL = `https://api.github.com/users/${getName.value}`;
            console.log(reqURL);

            let xhr = new XMLHttpRequest();
            xhr.open('GET', reqURL);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let data = JSON.parse(this.response);
                    let imgLink = data.avatar_url;
                    let followersCount = data.followers;

                    function showDetails(img, follower) {
                        let image = document.createElement('img');
                        image.setAttribute('src', `${img}`);
                        image.setAttribute('height', 200);
                        showImg.appendChild(image);

                        followers.innerText = `Your followers count: ${follower}`;
                        showImg.style.border = `2px solid black`;
                        showImg.style.display = `inline-block`;
                        showImg.style.marginTop = `50px`;
                    }

                    showDetails(imgLink, followersCount);
                } else if (xhr.readyState === 4) {
                    followers.innerText = 'Error fetching data. Please check the username.';
                }
            };

            xhr.send();
        }

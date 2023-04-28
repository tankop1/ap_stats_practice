let questionText = $('#question');
let answerButton = $('#answer-button');
let skipButton = $('#skip-button');
let responseText = $('#response');
let secretButton = $('#secret-button');
let passwordPage = $('#password-page');
let passwordEnterButton = $('#password-enter');
let passwordContainer = $('#password-container');
let secretPage = $('#secret-page');
let backButton = $('#back');

let questions = ['75 people were questioned about their age and the amount they have already saved for retirement. Based on this data, can you provide a range of values that your 36 year old instructor has likely saved for retirement?', 'How much more traffic is there on Friday afternoon compared with Saturday afternoon?  The number of cars was tracked on 40 randomly selected Fridays and 40 randomly selected Saturdays.', 'A study was done to see how much gas Americans consume.  600 Americans were asked how far they lived from their work and how many gallons of gas they used each week.  Find a confidence interval for the mean amount of gas that is used by Americans who live 15 miles from work.', 'Are people more likely to die of heart disease or cancer?  20,000 death certificates were examined.', 'What proportion of car accidents cause serious injuries?  2500 accidents were studied.', 'How many more people ride the gondola on Saturdays compared to Sundays?  Saturday and Sunday counts were tallied for 15 randomly selected weekends.', 'Do math students who spend time with a tutor earn a higher class average than those who do not have a math tutor?  43 students who used a tutor and 72 students who did not use a tutor took part in the study.', 'How likely are people to agree to answer a phone questioner when a market researcher calls?  A market researcher called 150 people and wrote down the results.', 'How much better is natural sunlight compared to indoor lighting?  5000 seeds were planted outside and 4000 inside to see how many would germinate.', '4000 contributors to a recent political campaign were studied to see what their income was and how much they contributed.  Come up with a confidence interval for the mean contribution that is made by people earning $40,000 per year.', 'Are people happier after they get married?  100 people were asked on a scale from 1 to 10 how happy they were one year before marriage and one year after marriage.', 'You want to estimate the average number of texts that college students send each day.  You survey 150 college students.', 'How much does exercise lower blood pressure.  100 people took part in a survey where they were tested before and after an extensive exercise program.', 'Do people spend more time watching television than they read?  75 people were asked how many minutes they spent watching television and how many minutes they read.', 'How much more exercise do Tahoe residents get than Reno residents?  85 Tahoe residents and 85 Reno residents were questioned about how many hours of exercise they get per week.'];
let answers = ['Prediction for a Single Value of y for a Fixed x', 'Confidence Interval for the Diff. Between 2 Means (Independent Samples)', 'Prediction for a Single Value of y for a Fixed x', 'Hyp. Test for the Difference Between 2 Proportions', 'Confidence Interval for a Proportion', 'Confidence Interval for Paired Data (Dependent Samples)', 'Hyp. Test for the Difference Between 2 Means (Independent Samples)', 'Confidence Interval for a Proportion', 'Confidence Interval for the Difference Between 2 Proportions', 'Prediction for a Single Value of y for a Fixed x', 'Hyp. Test for Paired Data (Dependent Samples)', 'Confidence Interval for a Population Mean', 'Confidence Interval for Paired Data (Dependent Samples)', 'Hyp. Test for Paired Data (Dependent Samples)', 'Confidence Interval for the Diff. Between 2 Means (Independent Samples)'];

let currentQuestion = '';
let currentIndex = 0;

NewQuestion();

function NewQuestion(event)
{
    if (event) event.preventDefault();
    if (questions.length != answers.length) alert("Lists of questions and answers are not aligned");

    responseText.text("");

    let randomIndex = Math.floor(Math.random() * questions.length);
    let randomQuestion = questions[randomIndex];

    while (randomQuestion == currentQuestion)
    {
        randomIndex = Math.floor(Math.random() * questions.length);
        randomQuestion = questions[randomIndex];
    }

    currentQuestion = randomQuestion;
    currentIndex = randomIndex;
    
    $('input:radio[name="choices"]').removeAttr('checked');
    $('input:radio[name="choices"]').prop('checked', false);
    questionText.text(currentQuestion);
}

function IsAnswerCorrect()
{
    let chosenAnswer = $('input[name="choices"]:checked').val();
    return chosenAnswer == answers[currentIndex];
}

function CheckAnswer(event)
{
    event.preventDefault();

    let isCorrect = IsAnswerCorrect();

    if (isCorrect)
    {
        startConfetti();
        setTimeout(stopConfetti, 1250);
        NewQuestion();
    }

    else {
        //alert("Incorrect answer. Please try again.");
        responseText.text("Incorrect answer. Please try again.");
    }
}

function ShowPasswordPage()
{
    passwordPage.css({'left': '0'});
}

function CheckPassword()
{
    let currentPassword = $('#password').val();
    let actualPassword = 'belinrocks';

    return currentPassword == actualPassword;
}

function ShowSecretPage()
{
    let isValidPassword = CheckPassword();

    if (isValidPassword)
    {
        secretPage.css({'left': '0'});
        passwordContainer.css({'margin-right': '250%'});
        backButton.css({'display': 'block'});
        SetupDownloadLinks();
    }

    else
    {
        alert("Incorrect Password");
    }
}

function GoBack()
{
    secretPage.css({'left': '100%'});
    passwordPage.css({'left': '100%'});
    backButton.css({'display': 'none'});

    passwordContainer.css({'display': 'none'});
    passwordContainer.css({'margin-right': '0'});
    setTimeout(() => {
        passwordContainer.css({'display': 'block'});
    }, 500);
}

answerButton.click(CheckAnswer);
skipButton.click(NewQuestion);
secretButton.click(ShowPasswordPage);
passwordEnterButton.click(ShowSecretPage);
backButton.click(GoBack);

$('#password').keypress(event => {
    let keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		ShowSecretPage();
	}
});

let downloadLinks = ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.prepscholar.com%2Fap-statistics-formula-sheet&psig=AOvVaw0Hf8Cjx67ZIw7gsVxrkNAj&ust=1682793996090000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJi1oaaezf4CFQAAAAAdAAAAABAJ', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcheatography.com%2Fprincessb3ll3%2Fcheat-sheets%2Fap-stat-test%2F&psig=AOvVaw1KGDtRb5bTd0zXh-fBiJGD&ust=1682792964172000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLj1g9mdzf4CFQAAAAAdAAAAABA7', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcheatography.com%2Fgsarkar%2Fcheat-sheets%2Fap-stats-chapter-10%2F&psig=AOvVaw1KGDtRb5bTd0zXh-fBiJGD&ust=1682792964172000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLj1g9mdzf4CFQAAAAAdAAAAABAz', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dummies.com%2Farticle%2Facademics-the-arts%2Fmath%2Fstatistics%2Fstatistics-for-dummies-cheat-sheet-208650%2F&psig=AOvVaw1KGDtRb5bTd0zXh-fBiJGD&ust=1682792964172000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLj1g9mdzf4CFQAAAAAdAAAAABAb', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstudylib.net%2Fdoc%2F10089718%2Fcalculator-cheat-sheet&psig=AOvVaw1KGDtRb5bTd0zXh-fBiJGD&ust=1682792964172000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLj1g9mdzf4CFQAAAAAdAAAAABAT', 'https://s3.studylib.net/store/data/008754176_1-0dfb2a40674ccba59ec489f30567bb46.png'];

function SetupDownloadLinks()
{
    $('.file').each((index, element) => {
        $(element).click(() => {
            //window.location.href = downloadLinks[index];
            window.open(downloadLinks[index], "_blank");
        });
    });
}
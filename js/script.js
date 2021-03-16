// фильтруем содержимое инпута на соответствие типу выбранной опции селектора
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	// функция скрытия блоков сответами
	hideAllResponseBlocks = () => {
		// Создаем новый массив из блоков с вариатнами ответов
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// Прячем все блоки с оветами
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	// функция показывающая блок с ответом
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// скрываем все блоки с ответами
		hideAllResponseBlocks();
		// Показывает блок с ответом по заданному селектору
		document.querySelector(blockSelector).style.display = 'block';
		// Если в блоке имеется span
		if (spanSelector) {
			// присваиваем span текстовое содержимое
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	// функция показывающая ошибки, содержит вызов функции с параметрами для показа блока с ошибкой
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	// функция показывающая результат, содержит вызов функции с параметрами для показа блока с результатом
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	// Стартовая функция показывающая блок результата до фильтрации
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	// функция обработчик try catch, выводит результат фильтрации
	tryFilterByType = (type, values) => {
		// если нет ошибок
		try {
			// сохраняем в перемнную результат выполнения сверки типа содержимого инпута и выбранного селекта
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// если содержимое не пустая строка
			const alertMsg = (valuesArray.length) ?
				// Пристваиваем переменной найденный контент
				`Данные с типом ${type}: ${valuesArray}` :
				// Если содержимого нет, присваиваем переменной текс об отсутсвии данных
				`Отсутствуют данные типа ${type}`;
			// Вызываем функцию показа результата, передаем содержимое результата фильтрации
			showResults(alertMsg);
		// если есть ошибка
		} catch (e) {
			// вызываем функцию показа ошибки с текстом ошибки
			showError(`Ошибка: ${e}`);
		}
	};

const filterButton = document.querySelector('#filter-btn');

// Функция обработчик события клика по кнопке фильтровать
filterButton.addEventListener('click', e => {
	// Находим селектор
	const typeInput = document.querySelector('#type');
	// Находим инпут для ввода данных
	const dataInput = document.querySelector('#data');

	// Если в инпуте data нет содержимого
	if (dataInput.value === '') {
		// Добавляем инпуту всплывающую подсказку с тектом
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// вызываем функцию показывающую блок результата до фильтрации
		showNoResults();
	// Если в инпуте data есть содержимое
	} else {
		// Удаляем у инпута всплывающую подсказку с тектом
		dataInput.setCustomValidity('');
		// отменяем стандартное поведение кнопки
		e.preventDefault();
		// вызываем функцию вывода результата фильтрации, передаем содержимое селектора и инпута ввода данных
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});


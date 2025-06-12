import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type click = {
	onClick: (props: FormState) => void;
};
type FormState = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};
export const ArticleParamsForm = (props: click) => {
	const [open, setIsOpen] = useState(false);
	const [selectedFamilyOptions, setSelectedFamilyOptions] = useState(
		fontFamilyOptions[0]
	);
	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[0]);
	const [selectedFontColors, setSelectedFontColors] = useState(fontColors[0]);
	const [selectedBackgroundColors, setSelectedBackgroundColors] = useState(
		backgroundColors[0]
	);
	const [selectedContentWidthArr, setSelectedContentWidthArr] = useState(
		contentWidthArr[0]
	);
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: open,
		rootRef: rootRef,
		onChange: setIsOpen,
	});

	const handleClickClear = () => {
		setSelectedBackgroundColors(backgroundColors[0]);
		setSelectedFamilyOptions(fontFamilyOptions[0]);
		setSelectedFontSize(fontSizeOptions[0]);
		setSelectedContentWidthArr(contentWidthArr[0]);
		setSelectedFontColors(fontColors[0]);
		props.onClick({
			fontFamilyOption: fontFamilyOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			fontSizeOption: fontSizeOptions[0],
			contentWidth: contentWidthArr[0],
		});
	};

	const handleClickSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		props.onClick({
			fontFamilyOption: selectedFamilyOptions,
			fontColor: selectedFontColors,
			backgroundColor: selectedBackgroundColors,
			fontSizeOption: selectedFontSize,
			contentWidth: selectedContentWidthArr,
		});
	};

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={open}
				onClick={() => {
					setIsOpen(!open);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form} onSubmit={handleClickSubmit}>
					<Text
						align={'left'}
						weight={800}
						size={31}
						uppercase={true}
						as={'h2'}>
						задайте параметры
					</Text>
					<Select
						selected={selectedFamilyOptions}
						options={fontFamilyOptions}
						onChange={setSelectedFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						title='размер шрифта'
						name='radio'
						options={fontSizeOptions}
						onChange={setSelectedFontSize}
						selected={selectedFontSize}
					/>
					<Select
						selected={selectedFontColors}
						options={fontColors}
						onChange={setSelectedFontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColors}
						options={backgroundColors}
						onChange={setSelectedBackgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={selectedContentWidthArr}
						options={contentWidthArr}
						onChange={setSelectedContentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleClickClear}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};

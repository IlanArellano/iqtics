import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import useUser from 'app/main/iqtrackComponents/hooks/useUser';

const useStyles = makeStyles(theme => ({
	root: {},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	error: {
		color: 'red',
		textAlign: 'center'
	}
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	email: yup.string().required('Introduce tu nombre de usuario'),
	password: yup.string().required('Introduce tu contraseña')
});

const defaultValues = {
	email: '',
	password: '',
	remember: false
};

function Login3Page() {
	const { login } = useUser();
	const [loginError, setLoginError] = useState('');
	const classes = useStyles();

	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	async function onSubmit(keys) {
		delete keys.remember;
		let formBody = [];
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < Object.keys(keys).length; i++) {
			const encodedKey = encodeURIComponent(Object.keys(keys)[i]);
			const encodedValue = encodeURIComponent(Object.values(keys)[i]);
			formBody.push(`${encodedKey}=${encodedValue}`);
		}
		formBody = formBody.join('&');
		const querySession = await fetch(`${process.env.REACT_APP_API_URL}/api/session`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: formBody
		});
		console.log(querySession);
		if (querySession.ok) {
			login({ user: keys.email, password: keys.password });
			window.location.href = '/app/iqtics/map';
		} else if (!querySession.ok && querySession.status === 401) {
			setLoginError('Usuario o contraseña no válidos');
		} else {
			setLoginError('No se ha podido conectar con el servidor');
		}
		reset(defaultValues);
	}

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.6 }}
				animate={{ opacity: 1, scale: 1 }}
				className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
			>
				<Card
					className={clsx(
						classes.leftSection,
						'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
					)}
					square
				>
					<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
							<div className="flex items-center mb-48">
								<img className="logo-icon w-48" src="assets/images/logos/fuse.svg" alt="logo" />
								<div className="border-l-1 mr-4 w-1 h-40" />
								<div>
									<Typography className="text-24 font-semibold logo-text" color="inherit">
										IQ
									</Typography>
									<Typography
										className="text-16 tracking-widest -mt-8 font-700"
										color="textSecondary"
									>
										Track
									</Typography>
								</div>
							</div>
						</motion.div>

						<form
							name="loginForm"
							noValidate
							className="flex flex-col justify-center w-full"
							onSubmit={handleSubmit(onSubmit)}
						>
							{loginError && <Typography className={classes.error}>{loginError}</Typography>}
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-16"
										label="Usuario"
										autoFocus
										type="text"
										error={!!errors.email}
										helperText={errors?.email?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-16"
										label="Contraseña"
										type="password"
										error={!!errors.password}
										helperText={errors?.password?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
								<Controller
									name="remember"
									control={control}
									render={({ field }) => (
										<FormControl>
											<FormControlLabel
												label="Mantener Sesión Iniciada"
												control={<Checkbox {...field} />}
											/>
										</FormControl>
									)}
								/>

								<Link className="font-normal" to="/pages/auth/forgot-password-2">
									Olvidaste tu contraseña?
								</Link>
							</div>

							<Button
								variant="contained"
								color="primary"
								className="w-full mx-auto mt-16"
								aria-label="LOG IN"
								disabled={_.isEmpty(dirtyFields) || !isValid}
								type="submit"
							>
								Iniciar Sesión
							</Button>
						</form>
					</CardContent>

					<div className="flex flex-col items-center justify-center pb-32">
						<span className="font-normal">
							Powered by
							<a href="https://iqtics.mx" target="_blank" rel="noreferrer">
								Iqtics
							</a>
						</span>
					</div>
				</Card>

				<div className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}>
					<div className="max-w-320">
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
						>
							<Typography color="inherit" className="text-32 sm:text-44 font-semibold leading-tight">
								Iniciar Sesión
								<br />
								en <br /> iqtrack
							</Typography>
						</motion.div>

						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
							<Typography variant="subtitle1" color="inherit" className="mt-32 font-medium">
								Sistema de rastreo GPS y Telemetría.
							</Typography>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

export default Login3Page;

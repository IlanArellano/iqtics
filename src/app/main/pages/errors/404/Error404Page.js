import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Error404Page() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center p-16">
			<div className="max-w-512 text-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
				>
					<Typography variant="h1" color="inherit" className="font-medium mb-16">
						404 ERROR
					</Typography>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}>
					<Typography variant="h5" color="textSecondary" className="mb-16 font-normal">
						La página que deseas ingresar no ha sido encontrada, puedes buscar lo que necesitas o volver al
						inicio.
					</Typography>
				</motion.div>

				<Paper className="flex items-center w-full h-56 p-16 mt-48 mb-16 shadow">
					<Icon color="action">search</Icon>
					<Input
						placeholder="Buscar"
						className="px-16"
						disableUnderline
						fullWidth
						inputProps={{
							'aria-label': 'Search'
						}}
					/>
				</Paper>

				<Link className="font-normal" to="/apps/dashboards/project">
					Volver al inicio
				</Link>
			</div>
		</div>
	);
}

export default Error404Page;

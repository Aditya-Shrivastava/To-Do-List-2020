import React from 'react';
import { useHistory } from 'react-router-dom';
import './SignIn.css';
import { FaGoogle } from 'react-icons/fa';

import { Firebase } from '../Firebase';

const SignIn = () => {
	const db = Firebase.firestore();

	const history = useHistory();

	const handleClick = async (e) => {
		e.preventDefault();

		var provider = new Firebase.auth.GoogleAuthProvider();

		Firebase.auth()
			.signInWithPopup(provider)
			.then((result) => {
				var user = result.user;
				var token = result.credential.accessToken;

				localStorage.setItem('TOKEN', token);
				localStorage.setItem('ID', user.uid);
				localStorage.setItem('DISPLAY_NAME', user.displayName);
				localStorage.setItem('PHOTO_URL', user.photoURL);

				const userData = {
					userName: user.displayName,
					imageUrl: user.photoURL,
					email: user.email,
					categories: [],
				};

				db.doc(`/users/${user.uid}`)
					.get()
					.then((doc) => {
						if (doc.exists) {
							console.log('User Already Registered');
							history.push('/');
						} else {
							db.doc(`/users/${user.uid}`).set(userData);
							console.log('User Registered Successfully');
							history.push('/');
						}
					})
					.catch((err) => {
						console.error(err);
						history.push('/login');
					});
			})
			.catch((err) => {
				console.log(err.code, err.message, err.email, err.credential);
			});
	};

	return (
		<div className='container'>
			<div className='login-card'>
				<div className='logo-div'></div>
				<h3 className='title'>Welcome Back!</h3>
				<h4 className='subtitle'>SignIn to start your journey</h4>
				<div className='login-svg'>
					<svg
						width='574'
						height='642'
						viewBox='0 0 574 642'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g id='login'>
							<g id='phone'>
								<path
									id='Vector'
									d='M541.78 0.00108443H301.165C289.554 0.00107181 278.288 3.95143 269.22 11.2028C260.152 18.4542 253.821 28.575 251.267 39.9017L129.689 579.169C128.363 585.051 128.34 591.152 129.621 597.044C130.902 602.936 133.456 608.476 137.105 613.277C140.753 618.077 145.408 622.021 150.742 624.833C156.076 627.644 161.96 629.255 167.983 629.551L415.337 641.738C428.582 642.391 441.612 638.202 451.996 629.954C462.379 621.705 469.407 609.96 471.768 596.911L540.734 215.643L545.865 217.109L559.061 144.844L553.78 143.524L573.031 37.0984C573.855 32.54 573.664 27.8558 572.471 23.3798C571.277 18.9038 569.111 14.7461 566.127 11.2032C563.142 7.66033 559.413 4.81948 555.205 2.88316C550.996 0.946854 546.413 -0.0372279 541.78 0.0010768L541.78 0.00108443Z'
									fill='#3F3D56'
								/>
								<path
									id='Vector_2'
									d='M332.842 11.6265H304.755C296.689 11.6265 288.865 14.3851 282.583 19.4444C276.301 24.5036 271.938 31.5593 270.218 39.44L153.52 574.307C152.848 577.387 152.849 580.575 153.522 583.654C154.195 586.734 155.525 589.631 157.421 592.149C159.316 594.668 161.733 596.747 164.506 598.246C167.279 599.744 170.342 600.627 173.487 600.833L420.042 616.992C426.997 617.448 433.877 615.327 439.369 611.033C444.86 606.74 448.579 600.575 449.814 593.714L549.394 40.8766C550.038 37.2985 549.89 33.6224 548.958 30.1079C548.027 26.5934 546.336 23.3262 544.004 20.5367C541.672 17.7473 538.756 15.5036 535.463 13.964C532.169 12.4244 528.577 11.6265 524.942 11.6265H498.297C495.718 11.6265 493.211 12.4766 491.164 14.0453C489.117 15.614 487.644 17.8137 486.974 20.3039V20.3039C486.382 22.5023 485.082 24.4443 483.275 25.8291C481.468 27.214 479.255 27.9645 476.978 27.9645H350.485C346.027 27.9645 341.733 26.2818 338.462 23.2527C335.191 20.2236 333.184 16.0715 332.842 11.6265V11.6265Z'
									fill='white'
								/>
							</g>
							<path
								id='left-arm'
								d='M68.9263 286.745L90.6653 329.782L155.666 359.333C162.608 371.064 184.666 371.962 186.27 364.375C188.069 355.865 159.484 342.167 159.484 342.167L105.116 305.393L100.359 273.736L68.9263 286.745Z'
								fill='#A0616A'
							/>
							<g id='man'>
								<path
									id='Vector_3'
									d='M71.4903 575.559L67.4813 607.632L90.7343 609.236L93.1393 575.559H71.4903Z'
									fill='#A0616A'
								/>
								<path
									id='Vector_4'
									d='M74.698 602.821C72.6193 600.623 70.7017 598.278 68.9602 595.804C65.6277 591.192 62.6707 614.848 62.6707 614.848C62.6707 614.848 59.4635 624.47 60.2653 629.281C61.0671 634.092 79.5091 634.092 82.7163 633.29C85.9236 632.488 101.96 633.29 101.96 633.29H126.015C146.862 623.668 126.015 617.254 126.015 617.254C119.6 616.452 97.9509 596.406 97.9509 596.406L93.14 587.586C89.9327 586.784 86.7254 598.812 86.7254 598.812L74.698 602.821Z'
									fill='#2F2E41'
								/>
								<path
									id='Vector_5'
									d='M11.3542 575.96L7.34424 608.033L30.5972 609.637L33.0032 575.96H11.3542Z'
									fill='#A0616A'
								/>
								<path
									id='Vector_6'
									d='M14.5614 603.222C12.4827 601.024 10.5652 598.679 8.82361 596.205C5.49114 591.594 2.53415 615.249 2.53415 615.249C2.53415 615.249 -0.673155 624.069 0.128695 628.88C0.930545 633.691 19.3725 633.691 22.5797 632.89C25.787 632.088 41.8234 633.691 41.8234 633.691H65.8781C86.7254 624.07 65.8781 617.655 65.8781 617.655C59.4635 616.853 37.8143 596.808 37.8143 596.808L33.0034 587.988C29.7961 587.186 26.5888 599.213 26.5888 599.213L14.5614 603.222Z'
									fill='#2F2E41'
								/>
								<path
									id='Vector_7'
									d='M37.8143 369.09C34.607 373.099 36.2107 386.73 36.2107 386.73C36.2107 386.73 30.5979 430.831 33.0034 434.84C35.4088 438.849 31.3997 442.056 28.9942 447.669C26.5887 453.282 24.1833 466.913 24.1833 466.913C10.5523 478.138 11.3542 529.455 11.3542 529.455L6.54321 575.159C8.14685 579.97 30.5978 580.771 33.8051 579.97C37.0125 579.168 46.6343 507.004 46.6343 507.004L68.2835 466.111C68.2835 466.111 66.6798 575.159 66.6798 579.97C66.6798 584.781 88.329 582.375 93.1399 582.375C97.9509 582.375 97.9509 502.193 97.9509 502.193L102.762 481.346L128.42 385.929V374.703L124.411 369.09C124.411 369.09 41.0216 365.081 37.8143 369.09Z'
									fill='#2F2E41'
								/>
								<path
									id='Vector_8'
									d='M73.0944 187.077C86.8222 187.077 97.9508 175.948 97.9508 162.22C97.9508 148.492 86.8222 137.364 73.0944 137.364C59.3665 137.364 48.2379 148.492 48.2379 162.22C48.2379 175.948 59.3665 187.077 73.0944 187.077Z'
									fill='#A0616A'
								/>
								<path
									id='Vector_9'
									d='M85.5226 173.847C80.4842 185.066 83.4676 200.737 93.5409 217.947L52.6479 198.703L59.0626 193.09L57.4589 177.054L85.5226 173.847Z'
									fill='#A0616A'
								/>
								<path
									id='Vector_10'
									d='M85.5226 199.505C90.8776 202.689 94.0809 208.538 95.9198 214.49C99.3242 225.51 101.373 236.904 102.022 248.419L103.964 282.894L128.019 374.302C107.172 391.942 95.1444 387.933 67.0807 373.5C39.017 359.067 35.8097 378.311 35.8097 378.311C35.8097 378.311 33.4042 377.509 35.8097 375.104C38.2152 372.698 35.8097 375.104 33.4043 372.698C30.9988 370.293 33.4043 372.698 34.2061 370.293C35.0079 367.887 34.2061 369.491 33.4043 368.689C32.6024 367.887 36.6115 360.671 36.6115 360.671L30.1969 300.534L22.1787 215.541C31.8006 203.514 59.0625 193.09 59.0625 193.09L83.919 210.73C91.9372 213.938 85.5226 201.108 85.5226 201.108L85.5226 199.505Z'
									fill='#A9CEDC'
								/>
								<path
									id='Vector_11'
									d='M8.9487 266.457L5.74146 314.566L46.6344 373.099C46.6344 386.73 53.8508 389.938 53.8508 389.938C56.5841 385.575 58.9959 381.019 61.0671 376.307C65.0763 367.487 58.6617 360.27 58.6617 360.27L30.5979 300.935L42.6252 271.268L8.9487 266.457Z'
									fill='#A0616A'
								/>
								<path
									id='Vector_12'
									d='M22.5797 215.942C8.94865 220.753 6.54321 272.872 6.54321 272.872C22.5797 264.052 41.8234 278.484 41.8234 278.484C41.8234 278.484 45.8324 264.853 50.6434 247.213C52.096 242.252 52.2696 237.003 51.1481 231.956C50.0265 226.909 47.6462 222.227 44.2288 218.348C44.2288 218.348 36.2106 211.131 22.5797 215.942Z'
									fill='#A9CEDC'
								/>
								<path
									id='Vector_13'
									d='M50.2425 169.838C53.4068 167.306 57.7237 171.908 57.7237 171.908L60.2552 149.124C60.2552 149.124 76.0769 151.023 86.2028 148.492C96.3287 145.96 97.9109 157.668 97.9109 157.668C98.4329 152.94 98.5388 148.175 98.2273 143.429C97.5944 137.733 89.3672 132.037 74.8112 128.24C60.2552 124.443 52.6607 140.897 52.6607 140.897C42.5349 145.96 47.0782 172.369 50.2425 169.838Z'
									fill='#2F2E41'
								/>
							</g>
							<g id='screen-elements'>
								<path
									id='Vector_14'
									d='M472.761 385.544C473.244 385.563 473.717 385.407 474.096 385.107C474.474 384.807 474.733 384.381 474.825 383.907L530.11 82.9902C530.163 82.7038 530.152 82.4093 530.079 82.1273C530.006 81.8454 529.873 81.5828 529.687 81.3579C529.502 81.133 529.27 80.9513 529.008 80.8253C528.745 80.6994 528.458 80.6324 528.167 80.6289L276.641 77.6987H276.618C276.164 77.7004 275.724 77.8557 275.37 78.1395C275.015 78.4232 274.767 78.8186 274.666 79.2612L209.492 370.411C209.428 370.695 209.428 370.99 209.49 371.275C209.552 371.559 209.676 371.827 209.853 372.059C210.029 372.291 210.255 372.481 210.513 372.617C210.771 372.752 211.055 372.83 211.346 372.844L472.761 385.544Z'
									fill='#72E4E9'
								/>
								<path
									id='Vector_15'
									d='M253.868 404.766C253.642 404.766 253.423 404.843 253.246 404.983C253.07 405.123 252.946 405.32 252.895 405.54L250.572 415.496C250.539 415.636 250.538 415.783 250.567 415.924C250.596 416.066 250.655 416.2 250.741 416.316C250.827 416.433 250.937 416.529 251.064 416.599C251.191 416.668 251.331 416.71 251.475 416.72L382.705 426.047C382.948 426.063 383.189 425.99 383.383 425.841C383.576 425.693 383.709 425.48 383.758 425.241L385.992 413.722C386.019 413.582 386.016 413.438 385.983 413.3C385.95 413.161 385.888 413.031 385.8 412.919C385.713 412.806 385.603 412.714 385.477 412.647C385.351 412.581 385.212 412.542 385.07 412.534L253.928 404.768C253.908 404.767 253.888 404.766 253.868 404.766Z'
									fill='#E6E6E6'
								/>
								<path
									id='Vector_16'
									d='M413.304 463.04C413.54 463.058 413.775 462.992 413.968 462.853C414.16 462.714 414.297 462.512 414.354 462.282L417.198 450.739C417.233 450.597 417.236 450.45 417.208 450.307C417.18 450.163 417.121 450.028 417.035 449.91C416.949 449.793 416.838 449.695 416.711 449.624C416.583 449.554 416.441 449.512 416.296 449.502L248.71 437.781C248.483 437.763 248.256 437.824 248.068 437.954C247.881 438.084 247.744 438.275 247.681 438.494L244.726 448.468C244.684 448.611 244.674 448.761 244.697 448.908C244.72 449.055 244.776 449.195 244.86 449.318C244.944 449.441 245.055 449.543 245.183 449.618C245.312 449.692 245.456 449.737 245.604 449.749L413.304 463.04Z'
									fill='#E6E6E6'
								/>
								<path
									id='Vector_17'
									d='M404.304 500.04C404.54 500.059 404.776 499.993 404.968 499.854C405.161 499.715 405.298 499.512 405.354 499.282L408.198 487.739C408.233 487.597 408.236 487.45 408.208 487.307C408.18 487.163 408.121 487.028 408.035 486.91C407.949 486.793 407.838 486.695 407.711 486.624C407.583 486.554 407.441 486.512 407.296 486.502L239.71 474.781C239.482 474.763 239.256 474.824 239.068 474.954C238.881 475.084 238.744 475.275 238.681 475.494L235.726 485.468C235.684 485.611 235.674 485.761 235.697 485.908C235.72 486.055 235.776 486.195 235.86 486.318C235.944 486.441 236.055 486.543 236.183 486.618C236.312 486.692 236.456 486.737 236.604 486.749L404.304 500.04Z'
									fill='#E6E6E6'
								/>
								<path
									id='Vector_18'
									d='M327.12 563.515C327.358 563.539 327.598 563.477 327.794 563.338C327.99 563.199 328.128 562.994 328.184 562.761L334.197 538.71C334.232 538.569 334.236 538.423 334.209 538.28C334.182 538.138 334.125 538.003 334.04 537.885C333.956 537.767 333.847 537.669 333.721 537.597C333.595 537.525 333.455 537.482 333.31 537.47L230.395 528.813C230.154 528.797 229.916 528.866 229.722 529.009C229.528 529.152 229.39 529.358 229.334 529.593L224.205 552.676C224.174 552.814 224.173 552.958 224.202 553.096C224.231 553.235 224.29 553.366 224.373 553.481C224.457 553.596 224.563 553.691 224.687 553.762C224.81 553.832 224.947 553.875 225.088 553.889L327.12 563.515Z'
									fill='#68EF7D'
								/>
							</g>
						</g>
					</svg>
				</div>
				<button className='login-btn' onClick={handleClick}>
					<FaGoogle />
					SignIn With Google
				</button>
			</div>
		</div>
	);
};

export default SignIn;
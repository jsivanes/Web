<?php

include_once 'unserialize.php';
function login_exist($tab, $user, $which)
{
	$i = 0;
	foreach ($tab as $login)
	{
		foreach ($login as $log)
		{
			if ($which == 0)
			{
				if ("Valider commande: ".$log == $user)
					return ($i);
			}
			else if ($which == 1)
			{
				if ($log == $user)
					return ($i);
			}
		}
		$i++;
	}
	return (-1);
}
function validate_commands($user, $which)
{
	$tab = unserialize(file_get_contents('../../private/passwd'));
	if ($which == 0)
		$index = login_exist($tab, $user, 0);
	if ($which == 1)
		$index = login_exist($tab, $user, 1);
	$tab[$index]['order'] = "";
	file_put_contents("../../private/passwd", serialize($tab));
}

function count_commands($tab)
{
	$i = 0;
	$e = 0;
	$res = 0;
	while($tab[$i])
	{
		while ($tab[$i]['order'][$e])
			$e++;
		$res = $res + $e;
		$i++;
	}
	return ($res);
}

function count_products($tab)
{
	$i = 0;
	$e = 0;
	while($tab[$i])
	{
		if ($tab[$i]['order'])
			$e++;
		$i++;
	}
	return ($e);
}

function show_commands($tab, $login)
{
	echo "Login ID: ".$login;
	echo "<br />";
	echo "Produit: ";
	foreach ($tab as $key => $value) {
		echo ("{$value[0][0]},");
		$total = $total + $value[0][1];
	}
	echo "total: {$total}$<br />";
}

?>

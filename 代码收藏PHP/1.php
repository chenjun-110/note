<?php
/**
* 
*/
 class AA{
	var $name="cj";
}
$a = new AA();
$a->name="LL";
$b = new AA();


echo "$a->name";
echo "$b->name";


?>
<script>
function AA() {
	name="cj";
}
aa = new AA();
aa.name="LL";
alert(aa.name);

bb = new AA();
//bb.name="GG";
alert(bb.name);




</script>
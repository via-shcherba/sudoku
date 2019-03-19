module.exports = function solveSudoku(matrix) {
  matrix = AlgorithmSimple(matrix);
  matrix = AlgorithmNakedCouples(matrix);
  matrix = AlgorithmSimple(matrix);
  return AlgorithmSimple(matrix); 
}

function AlgorithmSimple(matrix)
{
	let size = 9; //size natrix
	let blocks = []; // storage variants of blocks
	let cell = []; //common possible variants for cell
	let row = []; // variants from row
	let col = [];// variants from column
	for(let i=0;i<size;i++){
		row[i] = [];
		col[i] = [];
		blocks[i] = [];
	}
  
	let counterZero = 0; //counter zeros in matrix
    let control = 0; //infinity protection
	
	do{
		let coBl = 0; //block counter  
		for (let i = 0; i < size; i += 3)
		{
			for (let j = 0; j < size; j += 3)
			{
				// first blocks bypass                 
				let counter = 0;
				for (let ui = i; ui < i+3; ui++)
				{
					for (let uj = j; uj < j+3; uj++)
					{
					
						blocks[coBl][counter] = matrix[ui][uj]; //get variats for blocks
						counter++;
					
					}
				}
			
				counter = 0;
				//array with possible variants of numbers
				let possible = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
				for (let hb = 0; hb < size; hb++)
				{
					for (let hbb = 0; hbb < size; hbb++)
					{
					
						if (possible[hb] == blocks[coBl][hbb])
						{
							//removing unnecessary variants
							possible[hb] = 0;
						}
					}
				}
				//assignment possible variants
				for (let hb = 0; hb < size; hb++)
					blocks[coBl][ hb] = possible[hb];

				// second blocks bypass
				for (let ui = i; ui < i + 3; ui++)
				{
					for (let uj = j; uj < j + 3; uj++)
					{
						//if cell equels zero - selection of variants
						if (matrix[ui][uj] == 0)
						{
							for (let ro = 0; ro < size; ro++)
							{
								cell[ro] = blocks[coBl][ro]; 
								row[ro] = matrix[ui][ro]; //get row
								col[ro] = matrix[ro][uj]; //get column
							}
							for (let roch = 0; roch < size; roch++)
							{
								for (let roch2 = 0; roch2 < size; roch2++)
								{
									if (cell[roch] == row[roch2]) cell[roch] = 0; //clipping variants from row
									if (cell[roch] == col[roch2]) cell[roch] = 0; //clipping variants from column
								}
							}
							//counter amount variants
							let counterAV = 0;
							let tmp = 0;
							for (let b = 0; b < size; b++)
							{
								if (cell[b] > 0)
								{
									counterAV++;
									tmp = cell[b];
								}
							}
							// if there is only one variant, then assign it to the result matrix
							if (counterAV == 1) matrix[ui][uj] = tmp;
						}
					}
				}			
				coBl++;
			}
		}
		counterZero = 0; //counter zeros in matrix
		for (let i = 0; i < size; i++)
		{
			for (let j = 0; j < size; j++)
			{
				if (matrix[i][j] == 0) counterZero++;
			}
		}
		//infinity protection
		if(control == counterZero) counterZero = 0; 	
		control = counterZero;
	}while(counterZero > 0)	
    //console.log(counterZero);	
	return matrix; 
}

function AlgorithmNakedCouples(matrix)
{	
    let size = 9;
    for (let i = 0; i < size; i += 3)
    {
        for (let j = 0; j < size; j += 3)
        {                   
            let counterZeroInBlock = 0;
            for (let ui = i; ui < i + 3; ui++)
            {
                for (let uj = j; uj < j + 3; uj++)
					if (matrix[ui][uj] == 0) counterZeroInBlock++;                
            }
            if (counterZeroInBlock == 3) //if block has 3 zero - this is our block
            {                       
                var block = []; // storage variants of blocks
                let counter = 0;
                for (let ui = i; ui < i + 3; ui++)
                {
                    for (let uj = j; uj < j + 3; uj++)
                    {
                        block[counter] = matrix[ui][uj]; //get variats for block
                        counter++;
                    }
                }
                //array with possible variants of numbers
                var possible = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
                for (let hb = 0; hb < size; hb++)
                {
                    for (let hbb = 0; hbb < size; hbb++)
                    {
                        if (possible[hb] == block[hbb])
                        {
                            //removing unnecessary variants
                            possible[hb] = 0;
                        }
                    }
                }
                //assignment possible variants
                for (let hb = 0; hb < size; hb++)
                {
                    block[hb] = possible[hb];                   
                }

                // second blocks bypass
                let cell =[]; //common possible variants for cell
                let row = []; // variants from row
                let col = [];// variants from column
                let variant = [];
				for(let vi=0;vi<3;vi++)
					variant[vi] = [];
                let coCell = 0;
                for (let ui = i; ui < i + 3; ui++)
                {
                    for (let uj = j; uj < j + 3; uj++)
                    {
                        //if cell equels zero - selection of variants
                        if (matrix[ui][uj] == 0)
                        {
                            for (let ro = 0; ro < size; ro++)
                            {
                                cell[ro] = block[ro];
                                row[ro] = matrix[ui][ro]; //get row
                                col[ro] = matrix[ro][uj]; //get column
                            }
                            for (let roch = 0; roch < size; roch++)
                            {
                                for (let roch2 = 0; roch2 < size; roch2++)
                                {
                                    if (cell[roch] == row[roch2]) cell[roch] = 0; //clipping variants from row
                                    if (cell[roch] == col[roch2]) cell[roch] = 0; //clipping variants from column
                                }
                            }

                            let covar = 0;
                            for (let b = 0; b < size; b++)
                            {                                        
                                if (cell[b] > 0)
                                {
                                    if (covar < 2) variant[coCell][covar] = cell[b]; else return matrix; //if amount of variants > 2 return from this method
                                    covar++;
                                }
                            }
                            coCell++;
                        }
                    }
                }                       
                for (let cx = 0; cx < 2; cx++)
                {
                    let choice = variant[0][cx];
                    for (let ci = 0; ci < 3; ci++)
                    {
                        for (let cj = 0; cj < 2; cj++)
                        {
                            if (variant[ci][cj] == choice)
                            {
                                choice = variant[ci][cj];
                                variant[ci][cj] = 0;
                            }                                    
                        }
                    }
                }                      
                for (let cx = 0; cx < 3; cx++)
                {
                    for (let cy = 0; cy < 2; cy++)
                    {                              
                        if (variant[cx][cy] > 0)
                        {                                  
                            let position = 0;
                            for (let ui = i; ui < i + 3; ui++)
                            {
                                for (let uj = j; uj < j + 3; uj++)
                                {
                                    if (matrix[ui][uj] == 0)
                                    {
                                        matrix[ui][uj] = variant[position][cy];                                               
                                        position++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return matrix;        
}
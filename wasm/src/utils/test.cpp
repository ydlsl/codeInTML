
#include <string>
#include <cstring>
#include <stdio.h>
#include <iostream>
#define DEF_KEY "choho"

#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>

using namespace emscripten;
using namespace std;


string getNchar(string& str, int n)
{
	string nChars;
	if (n < 0 || n > str.size())
	{
		return "";
	}
	for (size_t i = 0; i < n; i++)
	{
		nChars.push_back(str[i]);
	}
	return nChars;
}


string test(string _testString, int _number){
		string res = getNchar(_testString, _number);
		return res;
}

// int main(){
	
// 	std::cout<<test("ghjghk", 2);
// 	return 0;
// }


EMSCRIPTEN_BINDINGS() {
    emscripten::function("test", &test);
}
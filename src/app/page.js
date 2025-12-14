"use client";
import React, { useState } from 'react';
import { Music, TestTube, Zap, Search, FileText, CheckCircle, XCircle, AlertCircle, Code, Play, TrendingUp, Award, Clock } from 'lucide-react';

const PROBLEMS = [
  {
    id: 'sum-array',
    title: 'Sum of Array',
    difficulty: 'Easy',
    description: 'Given an array of integers, return the sum of all elements.',
    examples: [
      { input: '[1, 2, 3]', output: '6' },
      { input: '[]', output: '0' },
      { input: '[-1, 2, -3]', output: '-2' }
    ],
    starterCode: `function sumArray(arr) {\n  // Write your solution here\n  \n}`,
    testCases: [
      { input: [1, 2, 3], expected: 6, description: 'Basic array' },
      { input: [], expected: 0, description: 'Empty array' },
      { input: [-1, 2, -3], expected: -2, description: 'Negative numbers' },
      { input: [100], expected: 100, description: 'Single element' },
      { input: [0, 0, 0], expected: 0, description: 'All zeros' }
    ]
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    description: 'Given a string, return the reversed version of it.',
    examples: [
      { input: '"hello"', output: '"olleh"' },
      { input: '""', output: '""' },
      { input: '"a"', output: '"a"' }
    ],
    starterCode: `function reverseString(s) {\n  // Write your solution here\n  \n}`,
    testCases: [
      { input: 'hello', expected: 'olleh', description: 'Basic string' },
      { input: '', expected: '', description: 'Empty string' },
      { input: 'a', expected: 'a', description: 'Single character' },
      { input: 'racecar', expected: 'racecar', description: 'Palindrome' },
      { input: 'Hello World', expected: 'dlroW olleH', description: 'With spaces' }
    ]
  },
  {
    id: 'find-max',
    title: 'Find Maximum',
    difficulty: 'Easy',
    description: 'Given an array of integers, return the maximum element.',
    examples: [
      { input: '[1, 5, 3, 9, 2]', output: '9' },
      { input: '[-5, -1, -10]', output: '-1' }
    ],
    starterCode: `function findMax(arr) {\n  // Write your solution here\n  \n}`,
    testCases: [
      { input: [1, 5, 3, 9, 2], expected: 9, description: 'Positive numbers' },
      { input: [-5, -1, -10], expected: -1, description: 'Negative numbers' },
      { input: [42], expected: 42, description: 'Single element' },
      { input: [0, 0, 0], expected: 0, description: 'All zeros' },
      { input: [100, 99, 101], expected: 101, description: 'Large numbers' }
    ]
  },
  {
    id: 'palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Medium',
    description: 'Determine if a string is a palindrome (reads same forward and backward).',
    examples: [
      { input: '"racecar"', output: 'true' },
      { input: '"hello"', output: 'false' }
    ],
    starterCode: `function isPalindrome(s) {\n  // Write your solution here\n  \n}`,
    testCases: [
      { input: 'racecar', expected: true, description: 'Valid palindrome' },
      { input: 'hello', expected: false, description: 'Not palindrome' },
      { input: '', expected: true, description: 'Empty string' },
      { input: 'a', expected: true, description: 'Single char' },
      { input: 'madam', expected: true, description: 'Another palindrome' }
    ]
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Medium',
    description: 'Find two numbers in array that add up to target. Return their indices.',
    examples: [
      { input: '[2, 7, 11, 15], target=9', output: '[0, 1]' }
    ],
    starterCode: `function twoSum(nums, target) {\n  // Write your solution here\n  \n}`,
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1], description: 'Basic case' },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2], description: 'Middle elements' },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1], description: 'Same numbers' }
    ]
  }
];

export default function CodeEvaluationOrchestra() {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [results, setResults] = useState(null);
  const [evaluationStage, setEvaluationStage] = useState(0);

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setResults(null);
  };

  const executeCode = (testCase) => {
    try {
      const func = new Function('return ' + code)();
      
      let result;
      if (selectedProblem.id === 'two-sum') {
        result = func(testCase.input.nums, testCase.input.target);
      } else {
        result = func(testCase.input);
      }
      
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const compareResults = (actual, expected) => {
    if (Array.isArray(expected)) {
      return JSON.stringify(actual) === JSON.stringify(expected);
    }
    return actual === expected;
  };

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setResults(null);
    setEvaluationStage(0);

    // Stage 1: Test Generation
    setTimeout(() => setEvaluationStage(1), 500);
    
    // Stage 2: Test Execution
    setTimeout(() => setEvaluationStage(2), 1500);
    
    // Stage 3: Analysis
    setTimeout(() => setEvaluationStage(3), 2500);
    
    // Stage 4: Results
    setTimeout(() => {
      setEvaluationStage(4);
      
      const testResults = selectedProblem.testCases.map(testCase => {
        const execution = executeCode(testCase);
        
        if (!execution.success) {
          return {
            input: testCase.input,
            expected: testCase.expected,
            actual: null,
            passed: false,
            error: execution.error,
            description: testCase.description
          };
        }
        
        const passed = compareResults(execution.result, testCase.expected);
        return {
          input: testCase.input,
          expected: testCase.expected,
          actual: execution.result,
          passed,
          error: passed ? null : 'Output does not match expected result',
          description: testCase.description
        };
      });

      const passed = testResults.filter(t => t.passed).length;
      const total = testResults.length;
      const score = Math.round((passed / total) * 100);

      let analysis = '';
      let summary = '';
      let complexity = '';

      // Generate specific analysis based on problem and results
      if (selectedProblem.id === 'sum-array') {
        if (score === 100) {
          analysis = 'Excellent implementation! The solution correctly handles all test cases including edge cases like empty arrays and negative numbers. The use of reduce with an initial value (0) is the optimal approach.';
          complexity = 'Time Complexity: O(n) - iterates through array once\nSpace Complexity: O(1) - constant extra space';
          summary = 'Perfect score! This demonstrates strong understanding of array operations and edge case handling. The solution is production-ready.';
        } else {
          const failedEmpty = testResults[1] && !testResults[1].passed;
          if (failedEmpty) {
            analysis = 'The solution works for normal cases but fails on edge cases. The reduce function needs an initial value to handle empty arrays. Without it, reduce throws an error when called on empty arrays.';
            complexity = 'Time Complexity: O(n)\nSpace Complexity: O(1)';
            summary = 'Good attempt! The core logic is correct, but edge case handling needs improvement. Add initial value 0 to the reduce function: reduce((a, b) => a + b, 0)';
          } else {
            analysis = 'The solution has logic errors. Check your implementation against the problem requirements.';
            complexity = 'Unable to determine complexity due to errors';
            summary = 'The implementation needs revision. Review the test failures and adjust your logic accordingly.';
          }
        }
      } else if (selectedProblem.id === 'reverse-string') {
        if (score === 100) {
          analysis = 'Perfect implementation! The solution correctly reverses strings of all lengths including edge cases like empty strings and single characters.';
          complexity = 'Time Complexity: O(n)\nSpace Complexity: O(n) - creates new string';
          summary = 'Excellent work! Clean and efficient string reversal implementation.';
        } else {
          analysis = 'The reversal logic needs adjustment. Consider using string methods like split, reverse, and join, or implement manual reversal with a loop.';
          complexity = 'Time Complexity: O(n)\nSpace Complexity: O(n)';
          summary = 'Review the string reversal approach. The current implementation doesn\'t produce correct output.';
        }
      } else if (selectedProblem.id === 'find-max') {
        if (score === 100) {
          analysis = 'Great solution! Correctly finds maximum in all scenarios including arrays with only negative numbers. Proper initialization prevents edge case issues.';
          complexity = 'Time Complexity: O(n)\nSpace Complexity: O(1)';
          summary = 'Perfect! The solution handles all edge cases including negative numbers and single elements.';
        } else {
          analysis = 'Common mistake: initializing max to 0 causes failures with negative-only arrays. Initialize max to arr[0] or use Math.max(...arr).';
          complexity = 'Time Complexity: O(n)\nSpace Complexity: O(1)';
          summary = 'Logic error detected. Consider how to handle arrays where all numbers are negative.';
        }
      } else if (selectedProblem.id === 'palindrome') {
        if (score === 100) {
          analysis = 'Excellent palindrome checker! Correctly identifies palindromes and handles edge cases like empty strings and single characters.';
          complexity = 'Time Complexity: O(n)\nSpace Complexity: O(n) if using string methods, O(1) if using two pointers';
          summary = 'Perfect implementation! Clean and efficient palindrome detection.';
        } else {
          analysis = 'The palindrome logic needs refinement. Consider comparing characters from both ends moving inward, or reversing the string and comparing.';
          complexity = 'Time Complexity: O(n)\nSpace Complexity: O(n)';
          summary = 'The current approach doesn\'t correctly identify palindromes. Review your comparison logic.';
        }
      } else if (selectedProblem.id === 'two-sum') {
        if (score === 100) {
          analysis = 'Optimal solution! Using a hash map achieves O(n) time complexity. This is the most efficient approach for the two-sum problem.';
          complexity = 'Time Complexity: O(n) - single pass with hash map\nSpace Complexity: O(n) - hash map storage';
          summary = 'Excellent! This demonstrates understanding of hash maps and optimization techniques.';
        } else {
          analysis = 'Consider using a hash map to store seen numbers and their indices. This allows finding the complement in O(1) time instead of nested loops.';
          complexity = 'Time Complexity: O(n²) if using nested loops\nSpace Complexity: O(1) for brute force';
          summary = 'The approach needs optimization. Current solution may be too slow for large inputs.';
        }
      }

      setResults({
        score,
        passed,
        total,
        testResults,
        analysis,
        summary,
        complexity
      });
      
      setIsEvaluating(false);
    }, 3500);
  };

  const AgentCard = ({ name, icon: Icon, description, color, isActive, stage }) => (
    <div className={`bg-gray-800 rounded-xl p-4 border-2 transition-all duration-300 ${
      isActive ? 'border-blue-400 shadow-lg shadow-blue-500/50' : 'border-gray-700'
    }`}>
      <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-all ${
        isActive ? 'animate-pulse scale-110' : ''
      }`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="font-bold text-white mb-1">{name}</h3>
      <p className="text-sm text-gray-400">{description}</p>
      {isActive && (
        <div className="mt-3">
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" style={{width: '100%'}}></div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900  p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-300 to-purple-900 shadow-2xl rounded-2xl mb-8 p-6">
          <div className="flex items-center gap-4">
            
            <div>
              <h1 className="text-3xl font-bold text-white">Code Evaluation Orchestra</h1>
              <p className="text-blue-100">AI-powered multi-agent interview evaluation system</p>
            </div>
          </div>
        </header>

        {/* Agent Orchestra */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 mb-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">AI Agent Orchestra</h2>
          </div>
          <p className="text-gray-400 mb-6">AI agents working in perfect harmony</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AgentCard 
              name="Test Generator" 
              icon={TestTube} 
              
              color="bg-gradient-to-br from-blue-500 to-blue-600" 
              isActive={evaluationStage === 1}
            />
            <AgentCard 
              name="Test Runner" 
              icon={Zap} 
              
              color="bg-gradient-to-br from-green-500 to-green-600" 
              isActive={evaluationStage === 2}
            />
            <AgentCard 
              name="Code Analyzer" 
              icon={Search} 
              
              color="bg-gradient-to-br from-purple-500 to-purple-600" 
              isActive={evaluationStage === 3}
            />
            <AgentCard 
              name="Summarizer" 
              icon={FileText} 
              color="bg-gradient-to-br from-orange-500 to-orange-600" 
              isActive={evaluationStage === 4}
            />
          </div>
        </div>

        {/* Problem Selector */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-600" />
            Select Your Challenge
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROBLEMS.map((problem) => (
              <button
                key={problem.id}
                onClick={() => handleProblemSelect(problem)}
                className={`p-4 rounded-xl border-2 transition-all text-left transform hover:scale-105 ${
                  selectedProblem?.id === problem.id
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800">{problem.title}</h3>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    problem.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{problem.description}</p>
              </button>
            ))}
          </div>

          {selectedProblem && (
            <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
              <h3 className="font-bold text-xl text-gray-800 mb-2">{selectedProblem.title}</h3>
              <p className="text-gray-700 mb-4">{selectedProblem.description}</p>
              
              <div className="space-y-2">
                <p className="font-semibold text-gray-800 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Examples:
                </p>
                {selectedProblem.examples.map((example, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-blue-200 shadow-sm">
                    <span className="font-mono text-sm">
                      Input: <span className="text-blue-600 font-semibold">{example.input}</span>
                      <span className="mx-2">→</span>
                      Output: <span className="text-green-600 font-semibold">{example.output}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Code Editor */}
        {selectedProblem && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-blue-400" />
                <span className="text-white font-bold">Code Editor</span>
                <span className="text-gray-400 text-sm">JavaScript</span>
              </div>
              
              <button
                onClick={handleEvaluate}
                disabled={isEvaluating}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100"
              >
                <Play className="w-4 h-4" />
                {isEvaluating ? 'Evaluating...' : 'Run Evaluation'}
              </button>
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-6 font-mono text-sm bg-gray-50 text-gray-900 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={14}
              placeholder="Write your code here..."
              spellCheck={false}
            />
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Evaluation Results
            </h2>

            {/* Score Card */}
            <div className={`p-6 rounded-xl border-2 mb-6 ${
              results.score >= 80 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300' 
                : results.score >= 60 
                ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300' 
                : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-300'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide opacity-70 mb-2">
                    Overall Score
                  </p>
                  <p className={`text-6xl font-black mb-2 ${
                    results.score >= 80 ? 'text-green-600' : results.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {results.score}%
                  </p>
                  <p className="text-lg font-semibold">
                    {results.passed} of {results.total} tests passed
                  </p>
                </div>
                <div className="text-7xl">
                  {results.score >= 80 ? '🎉' : results.score >= 60 ? '👍' : '💪'}
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Detailed Test Cases
              </h3>
              <div className="space-y-3">
                {results.testResults.map((test, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      test.passed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {test.passed ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-700 mb-1">{test.description}</p>
                        <p className="font-mono text-sm text-gray-600">
                          Input: <span className="font-bold">{JSON.stringify(test.input)}</span>
                        </p>
                        {!test.passed && (
                          <div className="mt-2 text-sm space-y-1">
                            <p>
                              <span className="text-gray-600">Expected:</span>{' '}
                              <span className="font-bold text-green-700">{JSON.stringify(test.expected)}</span>
                            </p>
                            <p>
                              <span className="text-gray-600">Got:</span>{' '}
                              <span className="font-bold text-red-700">{test.error || JSON.stringify(test.actual)}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complexity Analysis */}
            {results.complexity && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-gray-800">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Complexity Analysis
                </h3>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-4">
                  <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">{results.complexity}</pre>
                </div>
              </div>
            )}

            {/* Technical Analysis */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-gray-800">
                <Search className="w-5 h-5 text-blue-600" />
                Technical Analysis
              </h3>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-gray-800 leading-relaxed">{results.analysis}</p>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-gray-800">
                <Award className="w-5 h-5 text-orange-600" />
                Interview Summary
              </h3>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-4">
                <p className="text-gray-800 leading-relaxed">{results.summary}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}